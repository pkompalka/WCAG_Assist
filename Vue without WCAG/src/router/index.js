import { createWebHistory, createRouter } from "vue-router";
import AuctionComponent from "../components/Auction.vue";
import AuctionListComponent from "../components/AuctionList.vue";
import CreateAuctionComponent from "../components/CreateAuction.vue";
import HomeComponent from "../components/Home.vue";
import LoginComponent from "../components/Login.vue";
import RegisterComponent from "../components/Register.vue";
import ReviewComponent from "../components/Review.vue";
import TermsComponent from "../components/Terms.vue";
import TermsExtendedComponent from "../components/TermsExtended.vue";

const routes = [
  {
    path: "",
    name: "home",
    component: HomeComponent,
  },
  {
    path: "/login",
    name: "login",
    component: LoginComponent,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterComponent,
  },
  {
    path: "/create",
    name: "create",
    component: CreateAuctionComponent,
  },
  {
    path: "/category/:category",
    name: "category",
    component: AuctionListComponent,
  },
  {
    path: "/search/:search",
    name: "search",
    component: AuctionListComponent,
  },
  {
    path: "/bought/:id",
    name: "bought",
    component: AuctionListComponent,
  },
  {
    path: "/auction/:id",
    name: "auction",
    component: AuctionComponent,
  },
  {
    path: "/review",
    name: "review",
    component: ReviewComponent,
  },
  {
    path: "/terms",
    name: "terms",
    component: TermsComponent,
    props: {indexing: 'normal'}, 
  },
  {
    path: "/termsx",
    name: "termsx",
    component: TermsExtendedComponent,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
  
export default router;