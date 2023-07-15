import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionAPIService } from '../../api/auction-api.service';

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent implements OnInit {
  auctionList: any[] = [];

  constructor(private activatedRoute: ActivatedRoute, private auctionAPIService: AuctionAPIService) { }

  ngOnInit(): void {
    this.getAuctions();
  }

  async getAuctions(): Promise<void> {
    try{
      if (this.activatedRoute.snapshot.paramMap.get('category') != null) {
        this.auctionList = await this.auctionAPIService.getAuctionByCategory(this.activatedRoute.snapshot.paramMap.get('category'));
      }
      if (this.activatedRoute.snapshot.paramMap.get('search') != null) {
        this.auctionList = await this.auctionAPIService.getAuctionBySearch(this.activatedRoute.snapshot.paramMap.get('search'));
      }
      if (this.activatedRoute.snapshot.paramMap.get('id') != null)
      {
        this.auctionList = await this.auctionAPIService.getBoughtAuction(Number(this.activatedRoute.snapshot.paramMap.get('id')));
      }
    }
    catch{ }
  }

  auctionClick(props: any): void {
    if(window.confirm("Do you want to be redirected to auction page?"))
      document.location.href = "/auction/" + props.id;
  }

  closeAlert(): void {
    (document.getElementById('alert') as HTMLElement).style.display='none';
  }

  getAuctionDate(dateString: string): string {
    let date = new Date(dateString);
    return date.toLocaleString();
  }
}
