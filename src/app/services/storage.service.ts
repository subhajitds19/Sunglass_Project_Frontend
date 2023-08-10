import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  setdata(name:string, contact:string, email:string,id:any, token:string ){
    window.localStorage.setItem('name', name);
    window.localStorage.setItem('contact', contact);
    window.localStorage.setItem('email', email);
    window.localStorage.setItem('id', id);
    window.sessionStorage.setItem('token', token);
  }

  getdata(){
    const savedata=[];
    let data = {
      name:window.localStorage.getItem('name'),
      contact:window.localStorage.getItem('contact'),
      email:window.localStorage.getItem('email'),
      id: window.localStorage.getItem('id')
    }
    savedata.push(data);
    return savedata;
  }

  getToken(){
    return window.sessionStorage.getItem('token');
  }

  getSessionDestroy(){
    return window.sessionStorage.clear();
  }

  getLocalDestroy(){
    return window.localStorage.clear();
  }
}
