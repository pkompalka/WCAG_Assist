import { React, useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import Navbar from './Navbar';
import { getAuction, buyAuction } from "../api/AuctionAPI";
import './Auction.css';
import { getStorage } from "../utils/localStorage";

function Auction() {
  const { id } = useParams();
  const [auction, setAuction] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

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
      const buyParams = {
        AuctionID: id,
        UserID: getStorage("user").id
      }
      await buyAuction(buyParams);
      document.location.href = "/";
    } catch (e) { }
  }

  function onReviewClick() {
    document.location.href = "/review";
  }

  return (
    <div>
      <Navbar/>
      {auction && 
        <div className="auctionContainer">
          <p className="auctionTitle">{auction.title}</p>
          <div className="auctionImageComponent">
            <img className="auctionImg" alt={`Image of ${auction.title}`} alt={`Image of ${auction.title}`} src={auction.image}/>
            <p className="auctionDescription">{auction.description}</p>
          </div>
          <div className="auctionInformationComponent" >
            <div className="auctionSubFlexLeft" >
              <label className="auctionBasicLabel">Auction ends on:</label>
              <label className="auctionEndDate"><b>{endDate}</b></label>
              <br/>
              <label className="auctionBasicLabel">Auction created on:</label>
              <label className="auctionStartDate"><b>{startDate}</b></label>
              <button className="auctionReviewButton" onClick={onReviewClick}>Check opinion</button>
            </div>
            <div className="auctionSubFlexRight" >
              <div className="auctionPriceDiv">
                <label className="auctionBasicLabel">Auction price:</label>
                <label className="auctionPrice"><b>{auction.price} PLN</b></label>
              </div>
              <button className="auctionBuyButton" alt="Sell" onClick={onBuyClick}>Buy</button>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default Auction;