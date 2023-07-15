import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuctionAPIService } from '../../api/auction-api.service';
import { LocalService } from '../local.service';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {
  auction: any | undefined;
  id: any = ""
  startDate: any = ""
  endDate: any = ""

  constructor(
    private auctionAPIService: AuctionAPIService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private localService: LocalService) { }

  ngOnInit(): void {
    try {
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      const auction = this.getAuctions();
      let startDate = new Date(this.auction.startDate);
      let endDate = new Date(this.auction.endDate);
      this.startDate = startDate.toLocaleString();
      this.endDate = endDate.toLocaleString();
      this.auction = auction;
    }
    catch { }
  }

  async getAuctions(): Promise<void> {
    this.auction = await this.auctionAPIService.getAuction(this.id);
  }

  async onBuyClick(): Promise<void> {
    const buyParams = {
      AuctionID: this.id,
      UserID: this.localService.getStorage("user").id
    }
    await this.auctionAPIService.buyAuction(buyParams);
    document.location.href = "/";
  }

  onReviewClick(): void {
    this.router.navigateByUrl("/review");
  }
}
