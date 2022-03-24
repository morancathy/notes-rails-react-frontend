import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { CardScanView, CardScanApi } from "@cardscan.ai/insurance-cardscan-react";

export default function CardScan() {
  const [sessionToken, setSessionToken] = useState('');
  const [showScan, setShowScan] = useState(true);
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
        console.log(data)
        setSessionToken(data.token.Token);
      })
      setShowScan(true)
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
    const client = new CardScanApi({
      "sessionToken": "eyJraWQiOiJ1cy1lYXN0LTExIiwidHlwIjoiSldTIiwiYWxnIjoiUlM1MTIifQ.eyJzdWIiOiJ1cy1lYXN0LTE6Mjg2NDkzNTYtYzQyMC00YjA2LTlhN2EtNjA0Y2E1MWJiZWQ0IiwiYXVkIjoidXMtZWFzdC0xOjg1ZGY0MWZkLTU5MGItNDIxYS04NTdiLTlmMTBjNDUzMmViOCIsImFtciI6WyJhdXRoZW50aWNhdGVkIiwiY2FyZHNjYW4tc2FuZGJveC1jbGllbnQtdXMtZWFzdC0xIiwiY2FyZHNjYW4tc2FuZGJveC1jbGllbnQtdXMtZWFzdC0xOnVzLWVhc3QtMTo4NWRmNDFmZC01OTBiLTQyMWEtODU3Yi05ZjEwYzQ1MzJlYjg6M2QzMTQyM2YtYWI1MC00ZDIwLTk1ZmItOWUyYzc5YzZkNTA0fDA5ODJiYTdhLTk2ZGUtNGRlMy1hNWE4LWViYzI1ODQ1YTExYSJdLCJodHRwczovL2F3cy5hbWF6b24uY29tL3RhZ3MiOnsicHJpbmNpcGFsX3RhZ3MiOnsiYWNjb3VudF9pZCI6WyIzZDMxNDIzZi1hYjUwLTRkMjAtOTVmYi05ZTJjNzljNmQ1MDQiXSwidHlwZSI6WyJkZXZlbG9wZXJfaWRlbnRpdHkiXSwiZGV2ZWxvcGVyX3VzZXJfaWQiOlsiMDk4MmJhN2EtOTZkZS00ZGUzLWE1YTgtZWJjMjU4NDVhMTFhIl19fSwiaXNzIjoiaHR0cHM6Ly9jb2duaXRvLWlkZW50aXR5LmFtYXpvbmF3cy5jb20iLCJleHAiOjE2NDgxNDg0MzksImlhdCI6MTY0ODE0NDgzOX0.OYQTDUq69MPUYk3ICZnYQPxsG69qS5iMVDW1CJibiT_4nfRvHmad_U83Kvvqqumx_xWRDH8O2C7TBkZ6XBweOUhC0K6OD7JfTnAlcD8CD6gXXw4R5GDhroZ9EKRcmfxm4jBfQFZf0mDRmGQxL4kJ9jXH9D7q_SuGhpH3ZHNjq0e-9dgTmhWd_XwQiCleNI0Vts4IqvVThct9tCtBkbja7GadMPLPXKJ4hv2lGR0kbttvGTMRQD7Xc16hC4k6FM8hdxMo1ToGs-EMXSL9siYHXcjR2_akwYQ3S8tKlMjffekrzPADK59N-Cg9adLiZV0EL7GjcFLo3ui4VU6I065f0w",
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
        <div className="scan-button">
          <button className="scan-view-button" onClick={loadScanView}>Scan Insurance Card</button>
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