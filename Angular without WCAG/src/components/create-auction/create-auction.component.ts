import { Component, OnInit } from '@angular/core';
import { LocalService } from '../local.service';
import { AuctionAPIService } from '../../api/auction-api.service';

@Component({
  selector: 'app-create-auction',
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.css']
})
export class CreateAuctionComponent implements OnInit {
  email: string = "";
  title: string = "";
  description: string = "";
  price: number = 0;
  quantity: number = 1;
  date: Date | undefined;
  image: string | undefined;
  selectedCategory: string = "Cars";
  selectedSubCategory: string = "";
  isLoading: boolean = false;
  createError: string = "";
  categoriesList = this.localService.getStorage("categories");
  masterCategoriesList: any[] = [];
  subSubCategoriesList: any[] = [];

  constructor(private localService: LocalService, private auctionAPIService: AuctionAPIService) { }

  ngOnInit(): void {
    window.setTimeout(this.logoutUser, 30000);
    this.categoriesList = this.localService.getStorage("categories");
    this.masterCategoriesList = this.categoriesList.filter((category : any) => category.masterId == null);
  }

  async onCreateClicked(): Promise<void> {
    try {
      this.isLoading = true;
      this.createError = "";
      let auctionCategory = this.selectedSubCategory === "" ? this.selectedCategory : this.selectedSubCategory;
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
        UserID: this.localService.getStorage("user").id
      };
      await this.auctionAPIService.addAuction(auctionParams);    
      document.location.href = "/";
    } catch {
      this.createError = "Error occurred, try again.";
    } finally {
      this.isLoading = false;
    }
  }

  onImageChanged(event : any): void {
    const fileList = event.target.files;
    this.imageToBase64(fileList[0]);
  }

  imageToBase64(file : any): void {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.image = reader.result?.toString();
    }
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  
  getSubCategories(id: number) {
    return this.categoriesList.filter((subCategory: any) => subCategory.masterId === id);
  }

  onSelectOptionChanged(event: any) {
    this.title = "";
    this.selectedSubCategory = "";
    this.selectedCategory = event.target.value;
    let currentlySelectedCategoryId = this.categoriesList.find((category: any) => category.name == this.selectedCategory).id;
    this.subSubCategoriesList = this.categoriesList.filter((category: any) => category.masterId == currentlySelectedCategoryId);
  }

  onSubCategoryChanged(event: any) {
    this.selectedSubCategory = event.target.value;
    this.title = "";
  }
  
  onCreateKeyDown(event: any) {
    event.preventDefault();
  }

  onSelectOptionFocus() {
    this.title = "";
  }

  logoutUser(): void {
    this.localService.setStorage("user", false);
  }
}
