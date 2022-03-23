import React, {useState, useEffect} from "react";
import {CardScanView} from "@cardscan.ai/insurance-cardscan-react";

export default function CardScan() {
	const [token, setToken] = useState('');
  const [sessionToken, setSessionToken] = useState('');
	const [loggedInUser, setLoggedInUser] = useState('');

  useEffect(() => {
		if (window.localStorage.getItem('token')) {
			setToken(window.localStorage.getItem('token'));
			setLoggedInUser(window.localStorage.getItem('loggedInUser'));
		}
	}, []);

  const onSuccess = (card) => {
    console.log("new card: ", card);
  }
  
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
        console.log("data: ", data)
        setSessionToken(data.token.Token);
      })
		} catch (error) {
			console.error(error);
		} 
	};

  return (
    <>
  {console.log("sessiontooken", sessionToken)}
  {console.log("token", token)}
      { (!sessionToken)
      ? <button onClick={loadScanView}>Start Scanning</button>
      : <div>
          <CardScanView
            live={false}
            sessionToken={sessionToken}
            onSuccess={onSuccess}
          />
  {console.log("52sessiontooken", sessionToken)}
  {console.log("53token", token)}
        </div>         
      }
    </>
  );
};
