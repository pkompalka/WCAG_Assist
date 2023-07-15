<template>
<div>
  <div v-if="auctionList" class="auctionListContainer">
    <title class='title' @hidden="true">Auction list</title>
    <span id='alert' class="auctionListAlert" attr.aria-label="Number of auctions found: {{auctionList.length}}" @click="closeAlert">
      Number of auctions found: {{auctionList.length}}.
    </span>
    <div v-for="auction of auctionList" :key="auction" class="auctionListPanel" @click="auctionClick(auction)">
      <div class="auctionListImageComponent">
        <img class="auctionListImg" alt="{{auction.name}}" v-bind:src="auction.image"/>
        <label class="auctionListTitleLabel"><b>{{auction.title}}</b></label>
      </div>
      <div class="auctionListTextComponent" >
        <label aria><b>Price: {{auction.price}} PLN</b></label>
        <label><b>{{getAuctionDate(auction.endDate)}}</b></label>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { getStorage, setStorage } from '../utils/localStorage'
import { getAuctionByCategory, getAuctionBySearch, getBoughtAuction } from "../api/auctionAPIService";

export default {
  name: 'AuctionListComponent',

  data() {
    return { 
      auctionList: [],
    }
  },

  created() {
    try {
      this.getAuctions();
    }
    catch(error) {
      console.log(error);
    }
  },

  methods: {
    async getAuctions() {
      try{
        if (this.$route.params.category != null) {
          this.auctionList = await getAuctionByCategory(this.$route.params.category);
          setStorage("breadcrumbLink", `/category/${this.$route.params.category}`);
          setStorage("breadcrumbName", this.$route.params.category);
        }
        if (this.$route.params.search != null) {
          this.auctionList = await getAuctionBySearch(this.$route.params.search);
          setStorage("breadcrumbLink", `/search/${this.$route.params.search}`);
          setStorage("breadcrumbName", this.$route.params.search);
        }
        if (this.$route.params.id != null)
          this.auctionList = await getBoughtAuction(this.$route.params.id);
      }
      catch(error) {
        console.log(error);
      }
    },

    auctionClick(props) {
      if(getStorage("notifications")) {
        if(window.confirm("Do you want to be redirected to auction page?")) {
          document.location.href = "/auction/" + props.id;
        }
      }
      else {
        document.location.href = "/auction/" + props.id;
      }
    },

    closeAlert() {
      document.getElementById('alert').style.display='none';
    },

    getAuctionDate(dateString) {
      let date = new Date(dateString);
      return date.toLocaleString();
    }
  }
}
</script>

<style scoped>
.auctionListContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.auctionListPanel { 
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 5vw;
    padding-right: 5vw;
    margin-top: 3vh;
    margin-left: 3vw;
    margin-right: 3vw;
    border-style: solid;
    width: 90%;
    background-color: antiquewhite;
    height: 20vh;
    cursor: pointer;
}

.auctionListImg { 
    height: 18vh;
    width: 18vh;
    border-radius: 50%;
    border: 10px;
}

.auctionListTitleLabel { 
    margin-left: 20px;
}

.auctionListTextComponent { 
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    height: 100%;
    padding-top: 5vh;
    padding-bottom: 5vh;
}

.auctionListAlert {
    margin-top: 1%;
    background-color: yellow;
    color: black;
    width: 90%;
    cursor: pointer;
    height: 4vh;
    text-align: center;
    font-size: large;
}
</style>
