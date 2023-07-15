import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalService } from '../local.service';
import { AuctionAPIService } from '../../api/auction-api.service';

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent implements OnInit {
  category: string | null = null;
  search: string | null = null;
  id: number | null = null;
  auctionList: any[] = [];

  constructor(private localService: LocalService, private activatedRoute: ActivatedRoute, private auctionAPIService: AuctionAPIService) { }

  ngOnInit(): void {
    this.getAuctions();
  }

  async getAuctions(): Promise<void> {
    try{
      if (this.activatedRoute.snapshot.paramMap.get('category') != null) {
        this.category = this.activatedRoute.snapshot.paramMap.get('category');
        this.auctionList = await this.auctionAPIService.getAuctionByCategory(this.category);
        this.localService.setStorage("breadcrumbLink", `/category/${this.category}`);
        this.localService.setStorage("breadcrumbName", this.category);
      }
      if (this.activatedRoute.snapshot.paramMap.get('search') != null) {
        this.search = this.activatedRoute.snapshot.paramMap.get('search');
        this.auctionList = await this.auctionAPIService.getAuctionBySearch(this.search);
        this.localService.setStorage("breadcrumbLink", `/search/${this.search}`);
        this.localService.setStorage("breadcrumbName", this.search);
      }
      if (this.activatedRoute.snapshot.paramMap.get('id') != null)
      {
        this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
        this.auctionList = await this.auctionAPIService.getBoughtAuction(this.id);
      }
    }
    catch{ }
  }

  auctionClick(props: any): void {
    if(this.localService.getStorage("notifications")){
      if(window.confirm("Do you want to be redirected to auction page?")){
        document.location.href = "/auction/" + props.id;
      }
    }
    else{
      document.location.href = "/auction/" + props.id;
    }
  }

  closeAlert(): void {
    (document.getElementById('alert') as HTMLElement).style.display='none';
  }

  getAuctionDate(dateString: string): string {
    let date = new Date(dateString);
    return date.toLocaleString();
  }
}
