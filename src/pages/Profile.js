import React, {useState, useEffect} from 'react';

const Profile = () => {
  const [card, setCard] = useState({});

  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      fetchData()
    }
  }, []);  

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/card_details/`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${window.localStorage.getItem('token')}`
        }
      })
      const data = await response.json()
      setCard(data[data.length-1])
    } catch (err) {
      console.error(err)
    }                                                                                            
  }

  return (
    <div className="Profile">
      {!card ? (
					<header>~ No details available ~</header>
				) : (
					<>
            <header>~ Profile Page ~</header>
            <table> 
              <thead>
                <tr className="top"><th>Card Holder:</th><th>{card.member_name ? card.member_name : card['member_name']}</th></tr>
                <tr><td>Member Number:</td><td>{card.memberNumber ? card.memberNumber : card['member_number']}</td></tr>
                <tr><td>Insurance:</td><td>{card.payerName ? card.payerName : card['payer_name']}</td></tr>
                <tr><td>Plan ID:</td><td>{card.planId ? card.planId : card['plan_id']}</td></tr>
                <tr><td>Plan name:</td><td>{card.planName ? card.planName : card['plan_name']}</td></tr>
                <tr><td>RxBin:</td><td>{card.rxBin ? card.rxBin : card['rx_bin']}</td></tr>
                <tr><td>RxPCN:</td><td>{card.rxPCN ? card.rxPCN : card['rx_pcn']}</td></tr>
                <tr><td>RxGRP:</td><td>{card.rxGroup ? card.rxGroup : card['rx_group']}</td></tr>
                <tr><td>Dependents:</td><td>{card.dependentNames ? card.dependentNames : card['dependent_names']}</td></tr>
                <tr><td>Start Date:</td><td>{card.startDate ? card.startDate : card['start_date']}</td></tr>
                <tr><td>Card Specific ID:</td><td>{card.cardSpecificId ? card.cardSpecificId : card['card_specific_id']}</td></tr>
                <tr><td>Group Number:</td><td>{card.groupNumber ? card.groupNumber : card['group_number']}</td></tr>
                <tr><td>Client Name:</td><td>{card.clientName ? card.clientName : card['client_name']}</td></tr>
              </thead>
            </table>
          </>
        )
      }
    </div>
  );
};

export default Profile;