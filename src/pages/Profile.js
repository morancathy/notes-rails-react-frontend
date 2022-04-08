import React, {useState, useEffect} from 'react';

const Profile = () => {
  const [cards, setCards] = useState([]);

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
      setCards(data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      const responseCard = await fetch (`http://localhost:3000/card_details/${id}`,{
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'}
        }
      )
    } catch(error){
      console.error(error)
    }
  }

  return (
    <div className="Profile">
      {console.log("cards", cards)}
      { !cards ? (
					<header>~ No details available ~</header>
				) : (
					<>
            <header>~ Profile Page ~</header>
            <div className="card-detail-tables-div">
              {cards.map((card) => {
                return (
                  <>               
                    <table key={card.id} className="card-detail-table">
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
                      <button onClick={()=>handleDelete(card.id)}>Delete</button>  
                    </table>             
                  </>           
                )              
              })}
            </div>
          </>
        )
      }
    </div>
  );
};

export default Profile;