import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { CardScanView, CardScanApi } from "@cardscan.ai/insurance-cardscan-react";
import CloseButton from "./CloseButton";

export default function CardScan({token}) {
  const [sessionToken, setSessionToken] = useState(null);
  const [showScan, setShowScan] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);

  let navigate = useNavigate();

  // pulls data from scanned card
  const onSuccess = (card) => {
    let cardDetails = {}
    const {groupNumber, memberNumber, payerName, rxBin, rxPcn, rxGroup, memberName, dependentNames, planName, planId, clientName, startDate, cardSpecificId} = card.details;
   
    for (const [key, value] of Object.entries(card.details)){              
      typeof value === 'object' ? cardDetails[key] = value.value : cardDetails[key] = value
    }
    postData(cardDetails)
    navigate("/carddetails", {state: cardDetails});
  }

  // content of cardscan.ai
  const content = { 
    defaultAutoTitle: "Get Started",
    defaultManualTitle: "Take a photo",
    completedTitle: "Completed!"
  }

  const fetchSessionToken = async () => {
    if (sessionToken) return // if sessionToken already exist, dont get a new one.

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

  const postData = async (details) => {
    try {
      const response = await fetch(`http://localhost:3000/card_details/`, {
        method: 'POST',                                                  
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`,
        },
        body: JSON.stringify({ card_detail:{
          member_name: details.memberName,
          member_number: details.memberNumber,
          payer_name: details.payerName,
          plan_id: details.planId,
          plan_name: details.planName,
          rx_bin: details.rxBin,
          rx_pcn: details.rxPcn,
          rx_group: details.rxGroup,
          dependents: details.dependentNames,
          start_date: details.startDate,
          card_specific_id: details.cardSpecificId,
          group_number: details.groupNumber,
          client_name: details.clientName
        }})
      });
      const data = await response.json()
    } catch (error) {
      console.error(error);
    }
  };

  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

	const handleSubmission = (e) => {
    e.preventDefault();
    fetchSessionToken();

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

  // Obtain a session token from cardscan.ai on page reload
  useEffect(() => {
    fetchSessionToken();
  }, [])

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
              onClick={() => setShowScan(true)}
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