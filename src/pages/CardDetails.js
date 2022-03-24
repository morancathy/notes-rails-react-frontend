import React, {useState, useEffect} from "react";
import { useLocation } from 'react-router-dom';

export default function CardScan() {
  const {state: cardDetails} = useLocation();
  const location = useLocation();
  
  return (
    <div className="CardDetails">
      {console.log("cardDetails: ", cardDetails)} 
      <header>~ Card Details ~</header>
      <table> 
        <thead>
          <tr className="top"><th>Card Holder:</th><th>{cardDetails.memberName}</th></tr>
          <tr><td>Member Number:</td><td>{cardDetails.memberNumber}</td></tr>
          <tr><td>Insurance:</td><td>{cardDetails.payerName}</td></tr>
          <tr><td>Plan ID:</td><td>{cardDetails.planId}</td></tr>
          <tr><td>Plan name:</td><td>{cardDetails.planName}</td></tr>
          <tr><td>RxBin:</td><td>{cardDetails.rxBin}</td></tr>
          <tr><td>RxPCN:</td><td>{cardDetails.rxPCN}</td></tr>
          <tr><td>RxGRP:</td><td>{cardDetails.rxGroup}</td></tr>
          <tr><td>Dependents:</td><td>{cardDetails.dependentNames}</td></tr>
          <tr><td>Start Date:</td><td>{cardDetails.startDate}</td></tr>
          <tr><td>Card Specific ID:</td><td>{cardDetails.cardSpecificId}</td></tr>
          <tr><td>Group Number:</td><td>{cardDetails.groupNumber}</td></tr>
          <tr><td>Client Name:</td><td>{cardDetails.clientName}</td></tr>
        </thead>
      </table>
    </div>
  );
};