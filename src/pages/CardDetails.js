import React, {useState, useEffect} from "react";
import { useLocation } from 'react-router-dom';

export default function CardScan() {
  const {state: cardDetails} = useLocation();
  const [ card, setCard ] = useState({});

  useEffect(() => {
    const getCardDetails = async (cardId) => {
      try {
        const response = await fetch(`http://localhost:3000/cards/${cardId}`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        
        const data = await response.json()
        if (data.card.state == "completed") {
          const {member_number, payer_name, rx_bin, rx_pcn, rx_group, member_name, plan_id, card_specific_id, client_name} = data.card.details;
  
          for (const [key, value] of Object.entries(data.card.details)){              
            typeof value === 'object' ? cardDetails[key] = value.value : cardDetails[key] = value
          }
          setCard({...cardDetails})
          postData(cardDetails)
        } else {
          getCardDetails(cardDetails.id)
        }
      } catch (err) {
        console.error(err)
      }
    }

    if (cardDetails.id) {
      console.log(cardDetails.id)
      getCardDetails(cardDetails.id)
    } else {
      setCard(cardDetails)
    }
  }, [])

  const postData = async (details) => {
    try {
      const response = await fetch(`http://localhost:3000/card_details/`, {
        method: 'POST',                                                  
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${window.localStorage.getItem('token')}`
        },
        body: JSON.stringify({ card_detail:{
          member_name: details.member_name,
          member_number: details.member_number,
          payer_name: details.payer_name,
          plan_id: details.plan_id,
          plan_name: details.plan_name,
          rx_bin: details.rx_bin,
          rx_pcn: details.rx_pcn,
          rx_group: details.rx_group,
          dependents: details.dependent_names,
          start_date: details.start_date,
          card_specific_id: details.card_specific_id,
          group_number: details.group_number,
          client_name: details.client_name
        }})
      });
      const data = await response.json()
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="CardDetails">
      {console.log("cardDetails: ", card)} 
      <header>~ Card Details ~</header>
      <table> 
        <thead>
          <tr className="top"><th>Card Holder:</th><th>{card.memberName ? card.memberName : card['member_name']}</th></tr>
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
    </div>
  );
};