import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  public setStorage(key: string, value: any) {
    const json = JSON.stringify(value)
    const encrypted = btoa(json)
    localStorage.setItem(key, encrypted)
  }

  public getStorage(key: string) {
    const storedValue = localStorage.getItem(key)
    if (!storedValue) {
        return false
    }
    const decrypted = atob(storedValue)
    return JSON.parse(decrypted)
  }
}