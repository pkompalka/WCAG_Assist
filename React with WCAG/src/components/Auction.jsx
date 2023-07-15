import { React, useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import Navbar from '../components/Navbar';
import { getAuction, buyAuction } from "../api/AuctionAPI";
import './Auction.css';
import { getStorage } from "../utils/localStorage";

function Auction() {
  const { id } = useParams();
  const [auction, setAuction] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  let breadcrumbLink = getStorage("breadcrumbLink")
  let breadcrumbName = getStorage("breadcrumbName")

  useEffect(() => {
    async function loadAuction() {
      try {
        const auction = await getAuction(id);
        let startDate = new Date(auction.startDate);
        let endDate = new Date(auction.endDate);
        setStartDate(startDate.toLocaleString());
        setEndDate(endDate.toLocaleString());
        setAuction(auction);
      }
      catch { }
    }

    loadAuction();
  }, [id]);

  async function onBuyClick() {
    try {
      let confirmationText = "Do you want to buy this?\nPress OK to buy it.";
      if (window.confirm(confirmationText)) {
        const buyParams = {
          AuctionID: id,
          UserID: getStorage("user").id
        }
        await buyAuction(buyParams);
        document.location.href = "/";
      } 
    } catch (e) { }
  }

  function onReviewClick() {
    document.location.href = "/review";
  }

  return (
    <div>
      <Navbar/>
      {auction && 
      <div>    
        <ul class="breadcrumb">
          <li><a href="/">Home</a></li>
          <li> / </li>
          <li><a href={breadcrumbLink}>{breadcrumbName}</a></li>
          <li> / </li>
          <li>{auction.title}</li>
        </ul>    
        <title class='title' hidden={true}>Auction</title>
        <div className="auctionContainer">
          <p className="auctionTitle">{auction.title}</p>
          <div className="auctionImageComponent">
            <img className="auctionImg" alt={auction.title} src={auction.image}/>
            <p className="auctionDescription">{auction.description}</p>
          </div>
        <div className="auctionInformationComponent" >
          <div className="auctionSubFlexLeft" >
            <label className="auctionBasicLabel">Auction ends on:</label>
            <label className="auctionEndDate"><b>{endDate}</b></label>
            <br/>
            <label className="auctionBasicLabel">Auction created on:</label>
            <label className="auctionStartDate"><b>{startDate}</b></label>
            <button className="auctionReviewButton" aria-label='Check opinion of this' onClick={onReviewClick}>Check opinion</button>
          </div>
          <div className="auctionSubFlexRight" >
            <div className="auctionPriceDiv">
              <label className="auctionBasicLabel">Auction price:</label>
              <label className="auctionPrice"><b>{auction.price} PLN</b></label>
            </div>
              <button className="auctionBuyButton" aria-label='Buy auction' onClick={onBuyClick}>Buy</button>
            </div>
          </div>
        </div>
      </div>
      }
    </div>
  );
}

export default Auction;