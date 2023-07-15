<template>
<div>
  <div v-if="auction">     
    <div class="auctionContainer">
      <p class="auctionTitle">{{auction.title}}</p>
      <div class="auctionImageComponent">
        <img class="auctionImg" alt="{{auction.title}}" v-bind:src="auction.image">
        <p class="auctionDescription">{{auction.description}}</p>
      </div>
      <div class="auctionInformationComponent" >
        <div class="auctionSubFlexLeft" >
          <label class="auctionBasicLabel">Auction ends on:</label>
          <label class="auctionEndDate"><b>{{endDate}}</b></label>
          <br/>
          <label class="auctionBasicLabel">Auction created on:</label>
          <label class="auctionStartDate"><b>{{startDate}}</b></label>
          <button class="auctionReviewButton" @click="onReviewClick">Check opinion</button>
        </div>
        <div class="auctionSubFlexRight" >
          <div class="auctionPriceDiv">
            <label class="auctionBasicLabel">Auction price:</label>
            <label class="auctionPrice"><b>{{auction.price}} PLN</b></label>
          </div>
          <button class="auctionBuyButton" aria-label='Sell' @click="onBuyClick">Buy</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { getStorage } from '../utils/localStorage'
import { getAuction, buyAuction } from "../api/auctionAPIService";

export default {
  name: 'AuctionComponent',

  data() {
    return { 
      auction: undefined,
      id: "",
      startDate: "",
      endDate: "",
    }
  },

  created() {
    try {
      this.id = this.$route.params.id;
      this.getAuctions();
      let startDate = new Date(this.auction.startDate);
      let endDate = new Date(this.auction.endDate);
      this.startDate = startDate.toLocaleString();
      this.endDate = endDate.toLocaleString();
    }
    catch(error) {
      console.log(error);
    }
  },

  methods: {
    async getAuctions() {
      this.auction = await getAuction(this.id);
    },

    async onBuyClick() {
      const buyParams = {
        AuctionID: this.id,
        UserID: getStorage("user").id
      }
      await buyAuction(buyParams);
      document.location.href = "/";
    },

    onReviewClick() {
      this.router.navigateByUrl("/review");
    },
  }
}
</script>

<style scoped>
html, body {
    height: 100%;
  }
  
.auctionContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 2%;
}

.auctionTitle {
    font-weight: bold;
    font-size: xx-large;
}

.auctionDescription{
    white-space: pre-line;
    width: 70%;
}

.auctionImageComponent { 
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    text-align: center;
}

.auctionImg { 
    height: 40vh;
    width: 40vh;
}

.auctionInformationComponent { 
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 5%;
    width: 100%;
}

.auctionSubFlexLeft { 
    display: flex;
    flex-direction: column;
}

.auctionSubFlexRight { 
    display: flex;
    flex-direction: column;
    text-align: end;
    justify-content: space-around;
    width: 25%;
}

.auctionPriceDiv { 
    display: flex;
    flex-direction: column;
}

.auctionStartDate { 
    color: green;
    font-size: x-large;
}

.auctionEndDate { 
    color: red;
    font-size: x-large;
}

.auctionPrice { 
    color: goldenrod;
    font-size: x-large;
}

.auctionBasicLabel { 
    font-size: medium;
}

.auctionBuyButton { 
    background-color: green;
    color: white;
    border-radius: 15px;
    font-size: 125%;
}

.auctionReviewButton { 
    background-color: navy;
    color: white;
    border-radius: 15px;
    font-size: 125%;
    margin-top: 12%;
}
</style>
