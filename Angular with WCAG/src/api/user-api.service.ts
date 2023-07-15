import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAPIService {
  private API_USER_URL = ''

  constructor() { }

  handleResponse(response: any) {
    if (response.status >= 400) {
        throw Error(response.error)
    }
    return response
  }

  userLogin(userLoginRequest: any): Promise<any> {
    return fetch(this.API_USER_URL + '/login', {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userLoginRequest)
    })
    .then(r => r.json())
    .then(this.handleResponse)
  }

  userRegister(userRegisterRequest: any): Promise<any> {
    return fetch(this.API_USER_URL, {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userRegisterRequest)
    })
    .then(r => r.json())
    .then(this.handleResponse)
  }
}
