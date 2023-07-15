import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  public setStorage(key: string, value: any) {
    const json = JSON.stringify(value)
    localStorage.setItem(key, json)
  }

  public getStorage(key: string) {
    const storedValue = localStorage.getItem(key)
    if (!storedValue) {
        return false
    }
    return JSON.parse(storedValue)
  }
}