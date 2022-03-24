import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { CardScanView, CardScanApi } from "@cardscan.ai/insurance-cardscan-react";

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

  // close button (need to customize further)
  const customCloseButton = () => {
    return (
      <button type="button" onClick={() => {setShowScan(false), reposition()}}>Close</button>
    )
  };

  const reposition = () =>{
    window.scroll({
      top: 0,
      left: 0
    })
  }

  useEffect(() => {
    try {
			fetch (`http://localhost:3000/cardscan_session`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000/cardscan_session'
				},
			})
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setSessionToken(data.token.Token);
      })
		} catch (error) {
			console.error(error);
		} 
  }, [])

  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

	const handleSubmission = (e) => {
    e.preventDefault();
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
      { (sessionToken && showScan) ? 
        <div className="cardScanView">
          <CardScanView
            live={false}
            sessionToken={sessionToken}
            onSuccess={onSuccess}
            content={content}
            closeButton={customCloseButton()}   

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
        :
        <div className="scan-button">
          <a href="#cardscan">
            <button className="scan-view-button" onClick={() => setShowScan(true)}>Scan Insurance Card</button>
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