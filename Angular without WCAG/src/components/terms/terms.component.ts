import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {
  @Input() public indexing = "";

  constructor() { }

  ngOnInit(): void {
    window.setTimeout(this.redirectToHome, 30000);
  }

  redirectToHome(): void {
    window.open("/", "_blank");
  }
  
  onGoBackClick(): void {
    this.indexing != "extended" ? document.location.href = "/" : document.location.href = "/terms";
  }

  firstButtonTabIndex(): number {
    return this.indexing == 'normal' ? 0 : 1; 
  }

  secondButtonTabIndex(): number {
    return this.indexing == 'normal' ? 1 : 0;
  }
}
