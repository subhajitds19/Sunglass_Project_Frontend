import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../classes/item';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  profile_api : any = "http://localhost:2400/alldata"

  constructor(private http : HttpClient) { }
  getdata():Observable<Item[]>{
    return this.http.get<Item[]>(this.profile_api);
  }
}

