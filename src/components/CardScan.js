import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {CardScanView} from "@cardscan.ai/insurance-cardscan-react";

export default function CardScan() {
  const [sessionToken, setSessionToken] = useState('');
  const [showScan, setShowScan] = useState(true);
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
      <button type="button" onClick={() => {setShowScan(false)}}>Close</button>
    )
  };
  
  // authenticate user and provide cardscan token
  const loadScanView = async () => {
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
        setSessionToken(data.token.Token);
      })
      setShowScan(true)
		} catch (error) {
			console.error(error);
		} 
	};

  return (
    <div className="cardScan">
      { ((sessionToken) && showScan) ? 
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
        <button onClick={loadScanView}>Scan Insurance Card</button>
      }
    </div>
  );
};