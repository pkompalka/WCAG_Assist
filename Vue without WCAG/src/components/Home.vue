<template>
<div>
  <div>
    <div v-if="categoriesList">
      <button id="animationButton" @click="handleAnimation" alt="Toggle animation">Toggle animation</button>
      <label id="homeLabel" class="homeLabel"><b>What are you buying today?</b></label>
      <div class="homeMainContainer">
        <div v-for="mainCategory of mainCategoriesList" :key="mainCategory">
          <div class="homeFlexElement" @click="mainCategoryClick(mainCategory.id)">
            <input class="mainCategoryInput" :src="require(`@/assets/${mainCategory.name}.jpg`)" type="image" />
            <p><b>{{mainCategory.name}}</b></p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isMainCategorySelected">
      <div class="homeSubContainer">
        <div v-for='subCategory of subCategoriesList' :key="subCategory">
          <div class="homeFlexElement" @click="subCategoryClick(subCategory)">
            <input class="subCategoryInput" :src="require(`@/assets/${subCategory.name}.jpg`)" type="image" />
            <p><b>{{subCategory.name}}</b></p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isSubCategorySelected">
      <div class="homeSubContainer">
        <div v-for='subSubCategory of subSubCategoriesList' :key="subSubCategory">
          <div class="homeFlexElement" @click="goToCategory(subSubCategory.name)">
            <input class="subSubCategoryInput" :src="require(`@/assets/${subSubCategory.name}.jpg`)" type="image" />
          </div>
        </div>
      </div>
    </div>  
    <p v-if="isLoading">Loading....</p>
  </div>
</div>
</template>

<script>
import { getStorage, setStorage } from '../utils/localStorage'
import { getCategory } from '../api/categoryAPIService'

export default {
  name: 'HomeComponent',
  data() {
    return { 
      categoriesList: [],
      mainCategoriesList: [],
      subCategoriesList: [],
      subSubCategoriesList: [],
      isMainCategorySelected: false,
      mainCategorySelected: undefined,
      isSubCategorySelected: false,
      isLoading: false,
      registerError: "",
    }
  },
  
  created() {
    try {
      let categoriesList = getStorage("categories");
      if (categoriesList === false) {
        this.getCategories();
        categoriesList = getStorage("categories");
      }
      this.categoriesList = categoriesList;
      this.mainCategoriesList = categoriesList.filter(category => category.isSub === false);
    }
    catch(error) {
      console.log(error);
    }
  },

  methods: {
    async getCategories() {
      try {   
        this.isLoading = true;
        const categoriesList = await getCategory();
        setStorage("categories", categoriesList);
      }
      catch(error) { 
        console.log(error);
      }
      finally {
        this.isLoading = false;
      }
    },

    mainCategoryClick(mainCategoryId) {
      this.isSubCategorySelected = false;
      this.mainCategorySelected = mainCategoryId;
      this.isMainCategorySelected = true;
      this.subCategoriesList = this.categoriesList.filter(category => category.masterId === this.mainCategorySelected);
    },

    subCategoryClick(props) {
      this.isSubCategorySelected = true;
      this.subSubCategoriesList = this.categoriesList.filter(category => category.masterId === props.id);
      if (this.subSubCategoriesList.length === 0)
        this.goToCategory(props.name);
    },

    handleAnimation() {
      document.getElementById('animationButton').style.animationIterationCount = 'infinite';
    },

    goToCategory(categoryName) {
      document.location.href = "/category/" + categoryName;
    }
  }
}
</script>

<style scoped>
.homeMainContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 5vw;
    margin-top: 10rem;
}

.homeSubContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 5vw;
    margin-top: 1rem;
}

.homeLabel{
    margin-top: 1%;
    width: 100%;
    text-align: center;
    font-size: xx-large;
    background-color: yellow;
    animation-name: homeTitleAnimation;
    animation-duration: 0.2s;
    animation-iteration-count: infinite;
}

.homeFlexElement{
    cursor: pointer;
}

.mainCategoryInput{
    width: 10vw;
    height: 10vw;
    border-radius: 50%;
    border: 10px;
}

.subCategoryInput{
    width: 8vw;
    height: 8vw;
    border-radius: 50%;
    border: 8px;
}

.subSubCategoryInput{
    width: 5vw;
    height: 5vw;
    border-radius: 50%;
    border: 5px;
}

@keyframes homeTitleAnimation {
    0%   {background-color: yellow;}
    100%  {background-color: red;}
}

#animationButton {
    float: right;
    animation-name: homeTitleAnimation;
    animation-duration: 0.2s;
    animation-iteration-count: 0;
}
</style>
