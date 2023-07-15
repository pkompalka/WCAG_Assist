import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuctionListComponent } from './auction-list/auction-list.component';
import { AuctionComponent } from './auction/auction.component';
import { CreateAuctionComponent } from './create-auction/create-auction.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReviewComponent } from './review/review.component';
import { TermsExtendedComponent } from './terms-extended/terms-extended.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create', component: CreateAuctionComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'category/:category', component: AuctionListComponent },
  { path: 'search/:search', component: AuctionListComponent },
  { path: 'bought/:id', component: AuctionListComponent },
  { path: 'auction/:id', component: AuctionComponent },
  { path: 'review', component: ReviewComponent },
  { path: 'terms', component: TermsComponent, data: {indexing: 'normal'} },
  { path: 'termsx', component: TermsExtendedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
