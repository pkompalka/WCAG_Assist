import {React, useState, useEffect} from 'react';
import Navbar from '../components/Navbar'
import { getStorage } from "../utils/localStorage";
import './CreateAuction.css';
import { addAuction } from "../api/AuctionAPI";

function CreateAuction() {
  const [categoriesList, setcategoriesList] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [date, setDate] = useState();
  const [image, setImage] = useState();
  const [selectedCategory, setSelectedCategory] = useState("Cars");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [createError, setCreateError] = useState('');

  useEffect(() => {
    try {
      document.getElementById('rangeInput').value = 1;
      setcategoriesList(getStorage("categories"));
    } catch { }
  }, []);

  function onSelectOptionChanged(event) {
    setSelectedSubCategory("");
    setSelectedCategory(event.target.value);
  }

  function onSubCategoryChanged(event) {
    setSelectedSubCategory(event.target.value);
  }

  function onTitleChanged(event) {
    setTitle(event.target.value);
  }

  function onDescriptionChanged(event) {
    setDescription(event.target.value);
  }

  function onPriceChanged(event) {
    setPrice(event.target.value);
  }

  function onDateChanged(event) {
    setDate(event.target.value);
  }

  function onImageChanged(event) {
    const fileList = event.target.files;
    imageToBase64(fileList[0]);
  }

  function imageToBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setImage(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  async function onCreateClicked(e) {
    e.preventDefault();
    setIsLoading(true);
    setCreateError('');
    try {
      let auctionCategory = selectedSubCategory === "" ? selectedCategory : selectedSubCategory;
      const startDate = new Date().toJSON();
      const auctionParams = {
        Title: title,
        Description: description,
        Price: price,
        Quantity: quantity,
        StartDate: startDate,
        EndDate: date,
        CategoryName: auctionCategory,
        Image: image,
        UserID: getStorage("user").id
      };
      await addAuction(auctionParams);
      document.location.href = "/";
    } catch (e) {
      console.error(e, e.stack);
      setCreateError("Error occurred, try again");
    } finally {
      setIsLoading(false);
    }
  }

  function SelectorItem() {
    return <select className="createSelect" onChange={onSelectOptionChanged} value={selectedCategory}>
      {categoriesList.filter(category => category.masterId == null).map((filteredCategory) => <optgroup key={filteredCategory.name} label={filteredCategory.name}>
        {categoriesList.filter(subCategory => subCategory.masterId === filteredCategory.id).map((filteredSubCategory) => <option key={filteredSubCategory.name} value={filteredSubCategory.name}>{filteredSubCategory.name}</option>
        )}
      </optgroup>
      )}
    </select>;
  }

  function SubCategoryRadioButtons() {
    const currentlySelectedCategoryId = categoriesList.find(category => category.name === selectedCategory).id;
    return categoriesList.filter(category => category.masterId === currentlySelectedCategoryId).map((filteredCategory) => <div className='createLabel' key={filteredCategory.name}>
      <input type="radio" key={filteredCategory.name} id="subcategoryRadio" value={filteredCategory.name}
        onChange={onSubCategoryChanged} checked={selectedSubCategory === filteredCategory.name} required />
      <label htmlFor="subcategoryRadio" className='createLabel'><b>{filteredCategory.name}</b></label>
    </div>
    );
  }

  function onRangeInput() {
    let quantityValue = document.getElementById('rangeInput').value;
    document.getElementById('rangeOutput').value = quantityValue;
    setQuantity(quantityValue);
  }

  return (
    <div>
      <Navbar />
      <form onSubmit={onCreateClicked}>
        <div className='createContainer'>
          <title className='title'>Create auction</title>
          <label className='createLabel' htmlFor="title"><b>Title:</b></label>
          <input className='createInput' id="title" type="text" placeholder='Auction title' onChange={onTitleChanged} required />
          <label className='createLabel' htmlFor="description"><b>Description:</b></label>
          <textarea className="createTextArea" id="description" rows="10" placeholder='Add auction description' onChange={onDescriptionChanged} required />
          <label className='createLabel' htmlFor="price"><b>Price for one item:</b></label>
          <input className='createInput' id="price" type="number" step="0.01" min="1" placeholder='Set price' onChange={onPriceChanged} required />
          <label className='createLabel' htmlFor="rangeInput"><b>Quantity:</b></label>
          <input className='createRangeInput' id="rangeInput" type="range" min="1" max="40" onInput={onRangeInput} />
          <output id="rangeOutput">1</output>
          <label className='createLabel' htmlFor="date"><b>Auction end date and time:</b></label>
          <input className='createInput' id="date" type="datetime-local" onChange={onDateChanged} required />
          <label className='createLabel'><b>Select category:</b></label>
          {categoriesList && <SelectorItem />}
          {categoriesList && <SubCategoryRadioButtons />}
          <div className='flexRow'>
            <label htmlFor="fileInput" className='createPictureLabel'><b>Auction picture:</b></label>
            <div className='createHiddenDiv'>Add only one picture</div>
          </div>
          <input className='createInput' type="file" id="fileInput" onChange={onImageChanged} required />
          <input className='createSubmit' type="submit" value="Submit" alt="Submit" />
          {isLoading && <p>Creating auction....</p>}
          {createError && <p>{createError}</p>}
        </div>
      </form>
    </div>
  );
}

export default CreateAuction;