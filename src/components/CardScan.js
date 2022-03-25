import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { CardScanView, CardScanApi } from "@cardscan.ai/insurance-cardscan-react";
import CloseButton from "./CloseButton";

export default function CardScan() {
  const [sessionToken, setSessionToken] = useState(null);
  const [showScan, setShowScan] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false)

  let navigate = useNavigate();

  // pulls data from scanned card
  const onSuccess = (card) => {
    let cardDetails = {}
    const {groupNumber, memberNumber, payerName, rxBin, rxPcn, rxGroup, memberName, dependentNames, planName, planId, clientName, startDate, cardSpecificId} = card.details;
   
    for (const [key, value] of Object.entries(card.details)){              
      typeof value === 'object' ? cardDetails[key] = value.value : cardDetails[key] = value
    }
    navigate("/carddetails", {state: cardDetails});
  }

  // available cardscan.ai prop  (not yet active)
  const content = { 
    startingTitle: "Get Started",
    startingSubtitle: "Hold card inside rectangle" 
  }

  const fetchSessionToken = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/cardscan_session'
      }
    }

    try {
			const response = await fetch(`http://localhost:3000/cardscan_session`, options)
      const data = await response.json()
      if (data.msg == "OK") {
        setSessionToken(data.token.Token)
      } else {
        console.error(data.msg)
      }
		} catch (error) {
			console.error(error);
		} 
  }

  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

	const handleSubmission = (e) => {
    e.preventDefault();
    
    if (!sessionToken) fetchSessionToken();

    const client = new CardScanApi({
      "sessionToken": sessionToken,
      "live": false
    });
    
    client.uploadCardImage(selectedFile)
    .then((cardId) => {
      console.log(cardId)
      navigate("/carddetails", {state: {id: cardId}});
    })
    .catch((error) => {
      console.error(error)
    });
	};

  return (
    <div className="cardScan">
      { (sessionToken && showScan) 
      ? <div className="cardScanView">
          <CardScanView
            live={false}
            sessionToken={sessionToken}
            onSuccess={onSuccess}
            content={content}
            closeButton={<CloseButton setShowScan={setShowScan} />}   

            ////// Other available cardscan.ai props/////////
            // onCancel={cardScanCancel}
            // onError={onError}                     
            // successIndicator={successIndicator}
            // errorIndicator={errorIndicator}
            // indicatorOptions={indicatorOptions}
            // enableCameraPermissionModal={enableModal}
            ////////////////////////////////////////////////
            
          />
        </div>     
      : <div className="scan-button">
          <a href="#cardscan">
            <button 
              className="scan-view-button" 
              onClick={() => {
                if (!sessionToken) fetchSessionToken();
                setShowScan(true);
              }}
              >Scan Insurance Card
            </button>
          </a>
          <div className="file-upload">
            <input type="file" name="file" onChange={changeHandler} />
            {isSelected ? (
              <div>
                <p>Filename: {selectedFile.name}</p>
                <p>Filetype: {selectedFile.type}</p>
                <p>Size in bytes: {selectedFile.size}</p>
              </div>
            ) : (
              <p>Select a file to show details</p>
            )}
            <div>
              <button onClick={handleSubmission}>Submit</button>
            </div>
          </div>
        </div>
      }
    </div>
  );
};