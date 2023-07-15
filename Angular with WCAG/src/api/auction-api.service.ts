import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuctionAPIService {
  private API_AUCTION_URL = ''

  constructor() { }

  handleResponse(response: any) {
    if (response.status >= 400) {
        throw Error(response.error)
    }
    return response
  }

  getAuction(id: number): Promise<any> {
    return fetch(this.API_AUCTION_URL + '/auction/' + id, {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      method: 'get'
    })
    .then(r => r.json())
    .then(this.handleResponse)
  }

  getAuctionByCategory(category: string | null): Promise<any> {
    return fetch(this.API_AUCTION_URL + '/category/' + category, {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      method: 'get'
    })
    .then(r => r.json())
    .then(this.handleResponse)
  }

  getAuctionBySearch(word: string | null): Promise<any> {
    return fetch(this.API_AUCTION_URL + '/search/' + word, {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      method: 'get'
    })
    .then(r => r.json())
    .then(this.handleResponse)
  }

  getBoughtAuction(id: number | null): Promise<any> {
    return fetch(this.API_AUCTION_URL + '/bought/' + id, {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      method: 'get'
    })
    .then(r => r.json())
    .then(this.handleResponse)
  }

  getSellingAuction(id: number): Promise<any> {
    return fetch(this.API_AUCTION_URL + '/selling/' + id, {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      method: 'get'
    })
    .then(r => r.json())
    .then(this.handleResponse)
  }

  addAuction(addAuctionRequest: any): Promise<any> {
    return fetch(this.API_AUCTION_URL, {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addAuctionRequest)
    })
    .then(this.handleResponse)
  }

  buyAuction(buyAuctionRequest: any): Promise<any> {
    return fetch(this.API_AUCTION_URL + '/buy', {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buyAuctionRequest)
    })
    .then(this.handleResponse)
  }
}
