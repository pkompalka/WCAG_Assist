import { Component, OnInit } from '@angular/core';
import { LocalService } from '../local.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class HeroesComponent implements OnInit {
  isLoggedIn: boolean = (this.localService.getStorage("user") == false) ? false : true;
  usernameHello: string = "Hello, " + this.localService.getStorage("user").login;
  sellingLink: string = "/bought/" + this.localService.getStorage("user").id;
  searchInput: string = "";

  constructor(private localService: LocalService) { }

  ngOnInit(): void {
  }

  onSearchClicked(): void {
    document.location.href = "/search/" + this.searchInput;
  }

  onLogoutClick(): void {
    this.localService.setStorage("user", false);
    document.location.href = "/";
  }

  onColorClick(): void {
    if (document.body.style.background === 'goldenrod')
      document.body.style.background = 'white';
    else
      document.body.style.background = 'goldenrod';
  }
}
