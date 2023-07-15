import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  timeoutId : number | undefined;

  constructor(private location: Location) { }

  ngOnInit(): void {
    this.timeoutId = window.setTimeout(this.onGoBackClick, 30000);
  }

  onGoBackClick(): void {
    this.location.back();
  }

  handleAnimation(): void {
    (document.getElementById('videoLabel') as HTMLElement).style.animationIterationCount = 'infinite';
  }
}
