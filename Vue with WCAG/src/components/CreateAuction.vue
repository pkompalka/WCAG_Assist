<template>
<div>
  <form v-on:submit.prevent="onSubmit" @submit="onCreateClicked">
    <div class='createContainer'>
        <title class='title'>Create auction</title>
        <label class='createLabel' for="title"><b>Title:</b></label>
        <input class='createInput' id="title" type="text" v-model="title" placeholder='Auction title' required />
        <label class='createLabel' for="description"><b>Description:</b></label>
        <textarea class="createTextArea" id="description" v-model="description" rows="10" placeholder='Add auction description' required></textarea>
        <label class='createLabel' for="price"><b>Price for one item:</b></label>
        <input class='createInput' id="price" v-model="price" type="number" step="0.01" min="1" placeholder='Set price' required />
        <label class='createLabel' for="rangeInput"><b>Quantity:</b></label>
        <input class='createRangeInput' name="quantity" v-model="quantity" id="rangeInput" type="range" min="1" max="40"/>
        <output id="rangeOutput">{{quantity}}</output>
        <label class='createLabel' for="date"><b>Auction end date and time:</b></label>
        <input class='createInput' id="date" v-model="date" type="datetime-local" required />
        <label class='createLabel'><b>Select category:</b></label>
        <div v-if="categoriesList" class='createInput'>
          <select class="createSelect" @change="onSelectOptionChanged($event)">
            <optgroup v-for="masterCategory of masterCategoriesList" :key="masterCategory" v-bind:label="masterCategory.name">
              <option v-for="subCategory of getSubCategories(masterCategory.id)" :key="subCategory">{{subCategory.name}}</option>
            </optgroup>
          </select>
        </div>
        <div v-if="subSubCategoriesList" class='createInput'>
          <div v-for="subSubCategory of subSubCategoriesList" :key="subSubCategory" class='createLabel'>
            <input type="radio" id="subcategoryRadio" value={{subSubCategory.name}} @change="onSubCategoryChanged($event)" required />
            <label for="subcategoryRadio" class='createLabel'><b>{{subSubCategory.name}}</b></label>
          </div>
        </div>
        <div class='flexRow'>
          <label class='createPictureLabel' for="fileInput" ><b>Auction picture:</b></label>
          <div class='createHiddenDiv'>Add only one picture</div>
        </div>
        <input class='createInput' type="file" id="fileInput" @change="onImageChanged($event)" required />
        <input class='createSubmit' type="submit" value="Submit" alt="Submit"/>
        <p v-if="isLoading">Creating auction....</p>
        <p v-if="createError != ''">{{createError}}</p>
    </div>
  </form>
</div>
</template>

<script>
import { getStorage } from '../utils/localStorage'
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
      this.selectedSubCategory = "";
      this.selectedCategory = event.target.value;
      let currentlySelectedCategoryId = this.categoriesList.find(category => category.name == this.selectedCategory).id;
      this.subSubCategoriesList = this.categoriesList.filter(category => category.masterId == currentlySelectedCategoryId);
    },

    onSubCategoryChanged(event) {
      this.selectedSubCategory = event.target.value;
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
    display: inline-block;
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
    color: #4d0303;
    content: ' *';
}

.createHiddenDiv:hover {
    display: block;
    background-color: white;
    color: #4d0303;
}

.flexRow {
    display: flex;
    flex-direction: column;
    text-align: start;
    width: 54.5%;
}

.createRangeInput{
    width: 54.5%;
}

.createLabel:after {
    color: red;
    content: ' *';
}
</style>
