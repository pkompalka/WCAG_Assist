import {React, useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import Navbar from './Navbar';
import { getAuctionByCategory, getAuctionBySearch, getBoughtAuction } from "../api/AuctionAPI";
import './AuctionList.css';
import { getStorage, setStorage } from "../utils/localStorage";

function AuctionList() {
  const { category } = useParams();
  const { search } = useParams();
  const { id } = useParams();
  const [auctions, setAuctions] = useState();

  useEffect(() => {
    async function getAuctions() {
      try {
        let auctionList;
        if (category !== undefined) {
          auctionList = await getAuctionByCategory(category);
          setStorage("breadcrumbLink", `/category/${category}`);
          setStorage("breadcrumbName", category);
        }
        if (search !== undefined) {
          auctionList = await getAuctionBySearch(search);
          setStorage("breadcrumbLink", `/search/${search}`);
          setStorage("breadcrumbName", search);
        }
        if (id !== undefined)
          auctionList = await getBoughtAuction(id);

        setAuctions(auctionList);
      }
      catch { }
    }
    
    getAuctions();
  }, [category, search, id]);
  
  function auctionClick(props) {
    if(getStorage("notifications")){
      if(window.confirm("Do you want to be redirected to auction page?")){
        document.location.href = "/auction/" + props.id;
      }
    }
    else{
      document.location.href = "/auction/" + props.id;
    }
  }

  function closeAlert() {
    document.getElementById('alert').style.display='none';
  }

  function AuctionPanel(props) {
    const endDate = new Date(props.auction.endDate);
    return  <div className="auctionListPanel" onClick={() => auctionClick(props.auction)}>
              <div className="auctionListImageComponent">
                <img className="auctionListImg" alt={`${props.name}`} src={props.auction.image}/>
                <label className="auctionListTitleLabel"><b>{props.auction.title}</b></label>
              </div>
              <div className="auctionListTextComponent" >
                <label aria><b>Price: {props.auction.price} PLN</b></label>
                <label><b>Ends on: {endDate.toLocaleString()}</b></label>
              </div>
            </div>
  }

  return (
    <div>
      <Navbar/>
      <title class='title' hidden={true}>Auction list</title>
      {auctions && auctions.map((auction) =>
        <div className="auctionListContainer">
          <span id='alert' className="auctionListAlert" aria-label={`Number of auctions found: ${auctions.length}`} onClick={closeAlert}>
            Number of auctions found: {auctions.length}.
          </span>
          <AuctionPanel key={auction.id} auction={auction}/>
        </div>
      )}
    </div>
  );
}

export default AuctionList;