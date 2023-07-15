<template>
<div>
  <form v-on:submit.prevent="onSubmit" @submit="onCreateClicked">
    <div class='createContainer'>
      <b class='title'>Create auction</b>
      <label class='createLabel'><b>Title:</b></label>
      <input class='createInput' name="title" v-model="title" placeholder='Auction title' />
      <label class='createLabel'><b>Description:</b></label>
      <textarea class="createTextArea" @keydown="onCreateKeyDown($event)" name="description" v-model="description" rows="10" cols="100" placeholder='Add auction description'></textarea>
      <label class='createLabel'><b>Price for one item:</b></label>
      <input class='createInput' name="price" v-model="price" placeholder='Set price' />
      <label class='createLabel'><b>Quantity:</b></label>
      <input class='createRangeInput' name="quantity" v-model="quantity" id="rangeInput" type="range" min="1" max="40"/>
      <output id="rangeOutput">{{quantity}}</output>
      <label class='createLabel'><b>Auction end date and time:</b></label>
      <input class='createInput' name="date" v-model="date" type="datetime-local" />
      <label class='createLabel'><b>Select category:</b></label>
      <div v-if="categoriesList" class='createInput'>
        <select class="createSelect" @change="onSelectOptionChanged($event)" @focus="onSelectOptionFocus()">
          <optgroup v-for="masterCategory of masterCategoriesList" :key="masterCategory" v-bind:label="masterCategory.name">
            <option v-for="subCategory of getSubCategories(masterCategory.id)" :key="subCategory">{{subCategory.name}}</option>
          </optgroup>
        </select>
      </div>
      <div v-if="subSubCategoriesList" class='createInput'>
        <div v-for="subSubCategory of subSubCategoriesList" :key="subSubCategory" class='createLabel'>
          <input type="radio" name="subcategoryRadio" value={{subSubCategory.name}} @change="onSubCategoryChanged($event)" />
          <label><b>{{subSubCategory.name}}</b></label>
        </div>
      </div>
      <div class='flexRow'>
        <label class='createPictureLabel'><b>Auction picture:</b></label>
        <div class='createHiddenDiv'>Add only one picture</div>
      </div>
      <input class='createInput' type="file" id="fileInput" @change="onImageChanged($event)" />
      <input class='createSubmit' type="submit" value="Submit" />
      <p v-if="isLoading">Creating auction....</p>
      <p v-if="createError != ''">{{createError}}</p>
    </div>
  </form>
</div>
</template>

<script>
import { getStorage, setStorage } from '../utils/localStorage'
import { addAuction } from "../api/auctionAPIService";

export default {
  name: 'CreateAuctionComponent',

  data() {
    return { 
      email: "",
      title: "",
      description: "",
      price: 0,
      quantity: 1,
      date: undefined,
      image: undefined,
      selectedCategory: "Cars",
      selectedSubCategory: "",
      isLoading: false,
      createError: "",
      categoriesList: getStorage("categories"),
      masterCategoriesList: [],
      subSubCategoriesList: [],
    }
  },

  created() {
    this.categoriesList = getStorage("categories");
    this.masterCategoriesList = this.categoriesList.filter(category => category.masterId == null);
    setTimeout(this.logoutUser, 30000);
  },

  methods: {
    async onCreateClicked() {
      try {
        this.isLoading = true;
        this.createError = "";
        let auctionCategory = this.selectedSubCategory == "" ? this.selectedCategory : this.selectedSubCategory;
        const startDate = new Date().toJSON();
        const auctionParams = {
          Title: this.title,
          Description: this.description,
          Price: this.price,
          Quantity: this.quantity,
          StartDate: startDate,
          EndDate: this.date,
          CategoryName: auctionCategory,
          Image: this.image,
          UserID: getStorage("user").id
        };
        await addAuction(auctionParams);    
        document.location.href = "/";
      } catch(error) {
        console.log(error);
        this.createError = "Error occurred, try again.";
      } finally {
        this.isLoading = false;
      }
    },

    onImageChanged(event) {
      const fileList = event.target.files;
      this.imageToBase64(fileList[0]);
    },

    imageToBase64(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.image = reader.result?.toString();
      }
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    },
    
    getSubCategories(id) {
      return this.categoriesList.filter(subCategory => subCategory.masterId === id);
    },

    onSelectOptionChanged(event) {
      this.title = "";
      this.selectedSubCategory = "";
      this.selectedCategory = event.target.value;
      let currentlySelectedCategoryId = this.categoriesList.find(category => category.name == this.selectedCategory).id;
      this.subSubCategoriesList = this.categoriesList.filter(category => category.masterId == currentlySelectedCategoryId);
    },

    onSubCategoryChanged(event) {
      this.selectedSubCategory = event.target.value;
    }, 
  
    onCreateKeyDown(event) {
      event.preventDefault();
    },

    onSelectOptionFocus() {
      this.title = "";
    },

    logoutUser() {
      setStorage("user", false);
    }
  }
}
</script>

<style scoped>
.createContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.createLabel{
    margin-top: 1%;
    width: 54.5%;
}

.createTextArea{
    margin-top: 1%;
    width: 54.5%;
}

.createInput{
    width: 54.5%;
}

.createSelect{
    width: 54.5%;
}

.createSubmit{
    margin-top: 1%;
    margin-bottom: 1%;
    width: 40%;
}

.createHiddenDiv {
    display: none;
}
      
.createPictureLabel:hover + .createHiddenDiv {
    display: block;
    background-color: white;
    color: red;
}

.flexRow {
    display: flex;
    flex-direction: column;
    text-align: center;
}

.createRangeInput{
    width: 54.5%;
    pointer-events: none;
}
</style>
