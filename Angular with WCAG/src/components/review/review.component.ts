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
    this.timeoutId = window.setTimeout(this.onGoBackClick, 60000);
  }

  onGoBackClick(): void {
    this.location.back();
  }

  disableTimeout(): void {
    window.clearTimeout(this.timeoutId);
    (document.getElementById('reviewAlert') as HTMLElement).style.display = 'none';
  }
}
