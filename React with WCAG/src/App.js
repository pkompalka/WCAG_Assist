import React, { Component } from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/Home"
import Login from "./components/Login"
import Register from './components/Register';
import CreateAuction from './components/CreateAuction';
import AuctionList from './components/AuctionList';
import Auction from './components/Auction';
import Review from './components/Review';
import Terms from './components/Terms';
import TermsExtended from './components/TermsExtended';

export default class App extends Component {
    static displayName = App.name;

    render() {
       return(
        <div className="App">
            <Router>
                <Routes>
                    <Route exact path="/"  element={<Home/>}/>
                    <Route exact path="/login" element={<Login/>}/>
                    <Route exact path="/register" element={<Register/>}/>
                    <Route exact path="/create" element={<CreateAuction/>}/>
                    <Route name="category" path="/category/:category" element={<AuctionList/>} />
                    <Route name="search" path="/search/:search" element={<AuctionList/>} />
                    <Route name="selling" path="/bought/:id" element={<AuctionList/>} />
                    <Route name="auction" path="/auction/:id" element={<Auction/>} />
                    <Route name="review" path="/review" element={<Review/>} />
                    <Route name="terms" path="/terms" element={<Terms indexing='normal'/>} />
                    <Route name="termsx" path="/termsx" element={<TermsExtended/>} />
                </Routes>
            </Router>
        </div>
       );
    };
}
