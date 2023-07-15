import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryAPIService {
  private API_CATEGORY_URL = ''

  constructor() { }

  handleResponse(response: any) {
    if (response.status >= 400) {
        throw Error(response.error)
    }
    return response
  }

  getCategory(): Promise<any> {
    return fetch(this.API_CATEGORY_URL, {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      method: 'get'
    })
    .then(r => r.json())
    .then(this.handleResponse)
  }
}
