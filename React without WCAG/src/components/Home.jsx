import {React, useState, useEffect} from 'react';
import Navbar from './Navbar'
import { getStorage, setStorage } from "../utils/localStorage";
import './Home.css';
import { getCategory } from "../api/CategoryAPI";

function Home() {
  const [categoriesList, setcategoriesList] = useState();
  const [isMainCategorySelected, setIsMainCategorySelected] = useState(false);
  const [mainCategorySelected, setMainCategorySelected] = useState();
  const [isSubCategorySelected, setIsSubCategorySelected] = useState(false);
  const [subCategorySelected, setSubCategorySelected] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      let categoriesList = getStorage("categories");
      if (categoriesList === false) {
        getCategories();
        categoriesList = getStorage("categories");
      }
      setcategoriesList(categoriesList);
    } catch { }
  }, []);

  async function getCategories() {
    try {
      setIsLoading(true);
      const categoriesList = await getCategory();
      setStorage("categories", categoriesList);
    }
    catch { }
    finally {
      setIsLoading(false);
    }
  }

  function mainCategoryClick(mainCategoryId) {
    setIsSubCategorySelected(false);
    setMainCategorySelected(mainCategoryId);
    setIsMainCategorySelected(true);
  }

  function subCategoryClick(props) {
    if (categoriesList.filter(category => category.masterId === props.subCategoryId).length === 0) {
      goToCategory(props.name);
    }
    setIsSubCategorySelected(false);
    setSubCategorySelected(props.subCategoryId);
    setIsSubCategorySelected(true);
  }

  async function goToCategory(categoryName) {
    document.location.href = "/category/" + categoryName;
  }

  function HomeMenu() {
    return <div>
      <button id="animationButton" onClick={handleAnimation} alt="Toggle animation">Toggle animation</button>
      <label className="homeLabel"><b>What are you buying today?</b></label>
      <div className="homeMainContainer">
        {categoriesList.filter(category => category.isSub === false).map((filteredCategory) => <MainContainerItem key={filteredCategory.name} name={filteredCategory.name} mainCategoryId={filteredCategory.id} />
        )}
      </div>
    </div>;
  }

  function SubMenu() {
    return <div className="homeSubContainer">
      {categoriesList.filter(category => category.masterId === mainCategorySelected).map((filteredCategory) => <SubContainerItem key={filteredCategory.name} name={filteredCategory.name} subCategoryId={filteredCategory.id} />
      )}
    </div>;
  }

  function SubSubMenu() {
    return <div className="homeSubContainer">
      {categoriesList.filter(category => category.masterId === subCategorySelected).map((filteredCategory) => <SubSubContainerItem key={filteredCategory.name} name={filteredCategory.name} subCategoryId={filteredCategory.id} />
      )}
    </div>;
  }

  function MainContainerItem(props) {
    const fileNameExt = props.name + '.jpg';
    return <div className="homeFlexElement" onClick={() => mainCategoryClick(props.mainCategoryId)} onDoubleClick={() => goToCategory(props.name)}>
      <input className="mainCategoryInput" src={require('../img/' + fileNameExt)} type="image" />
      <p><b>{props.name}</b></p>
    </div>;
  }

  function SubContainerItem(props) {
    const fileNameExt = props.name + '.jpg';
    return <div className="homeFlexElement" onClick={() => subCategoryClick(props)} onDoubleClick={() => goToCategory(props.name)}>
      <input className="subCategoryInput" src={require('../img/' + fileNameExt)} type="image" />
      <p><b>{props.name}</b></p>
    </div>;
  }

  function SubSubContainerItem(props) {
    const fileNameExt = props.name + '.jpg';
    return <div className="homeFlexElement" onClick={() => goToCategory(props.name)}>
      <input className="subSubCategoryInput" src={require('../img/' + fileNameExt)} type="image" />
    </div>;
  }

  function handleAnimation() {
    document.getElementById('homeLabel').style = 'animation-iteration-count: infinite;';
  }

  return (
    <div>
      <Navbar />
      <div>
        {categoriesList && <HomeMenu />}
        {isMainCategorySelected && <SubMenu />}
        {isSubCategorySelected && <SubSubMenu />}
        {isLoading && <p>Loading....</p>}
      </div>
    </div>
  );
}

export default Home;
