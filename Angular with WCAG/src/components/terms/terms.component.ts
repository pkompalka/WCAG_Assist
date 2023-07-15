import { Component, Input, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {
  @Input() public indexing = "";
  buttonText : string | undefined;

  constructor(private scroller : ViewportScroller) { }

  ngOnInit(): void {
    this.buttonText = this.indexing != "extended" ? "Go to home page" : "Go to normal terms page";
  }

  onGoBackClick(): void {
    this.indexing != "extended" ? document.location.href = "/" : document.location.href = "/terms";
  }

  scrollToExtended() {
    this.scroller.scrollToAnchor("extendedSection");
  }
}
