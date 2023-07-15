import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AuctionComponent } from './auction/auction.component';
import { AuctionListComponent } from './auction-list/auction-list.component';
import { CreateAuctionComponent } from './create-auction/create-auction.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReviewComponent } from './review/review.component';
import { TermsComponent } from './terms/terms.component';
import { TermsExtendedComponent } from './terms-extended/terms-extended.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HomeComponent,
    AuctionComponent,
    AuctionListComponent,
    CreateAuctionComponent,
    LoginComponent,
    RegisterComponent,
    ReviewComponent,
    TermsComponent,
    TermsExtendedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
