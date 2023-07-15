import { Component, OnInit } from '@angular/core';
import { LocalService } from '../local.service';
import { CategoryAPIService } from '../../api/category-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  notificationsStatus: string = this.localService.getStorage("notifications") == true ? "Site notifications currently enabled" : "Site notifications currently disabled";
  categoriesList: any[] = [];
  mainCategoriesList: any[] = [];
  subCategoriesList: any[] = [];
  subSubCategoriesList: any[] = [];
  isMainCategorySelected: boolean = false;
  mainCategorySelected: number | undefined;
  isSubCategorySelected: boolean = false;
  isLoading: boolean = false;
  registerError: string = "";

  constructor(private localService: LocalService, private categoryAPIService: CategoryAPIService) { }

  ngOnInit(): void {
    try{
      let categoriesList = this.localService.getStorage("categories");
      if (categoriesList === false) {
        this.getCategories();
        categoriesList = this.localService.getStorage("categories");
      }
      this.categoriesList = categoriesList;
      this.mainCategoriesList = this.categoriesList.filter(category => category.isSub === false);
    }
    catch{}
  }

  async getCategories(): Promise<void> {
    try {
      this.isLoading = true;
      const categoriesList = await this.categoryAPIService.getCategory();
      this.localService.setStorage("categories", categoriesList);
    }
    catch { }
    finally {
      this.isLoading = false;
    }
  }

  mainCategoryClick(mainCategoryId: number): void {
    this.isSubCategorySelected = false;
    this.mainCategorySelected = mainCategoryId;
    this.isMainCategorySelected = true;
    this.subCategoriesList = this.categoriesList.filter(category => category.masterId === this.mainCategorySelected);
  }

  subCategoryClick(props: any): void {
    this.isSubCategorySelected = true;
    this.subSubCategoriesList = this.categoriesList.filter(category => category.masterId === props.id);
    if (this.subSubCategoriesList.length === 0)
      this.goToCategory(props.name);
  }

  goToCategory(categoryName: string): void {
    document.location.href = "/category/" + categoryName;
  }

  handleAnimation(): void {
    if ((document.getElementById('homeLabel') as HTMLElement).style.animationIterationCount === '0')
      (document.getElementById('homeLabel') as HTMLElement).style.animationIterationCount = 'infinite';
    else
      (document.getElementById('homeLabel') as HTMLElement).style.animationIterationCount = '0';
  }

  onNotificationClick(): void {
    if (this.localService.getStorage("notifications") == true) {
      this.localService.setStorage("notifications", false);
      this.notificationsStatus = "Site notifications currently disabled";
    }
    else {
      this.localService.setStorage("notifications", true);
      this.notificationsStatus = "Site notifications currently enabled";
    }
  }
}
