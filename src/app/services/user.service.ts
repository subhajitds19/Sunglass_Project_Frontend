import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Item, User, Contact, Buynow } from '../classes/item';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  profile_api : any = "http://localhost:2100/getItem";
  single_api : any = "http://localhost:2100/single";
  reg_api : any = "http://localhost:2100/registration";
  log_api : any = "http://localhost:2100/login";
  contact_api : any = "http://localhost:2100/contact";
  User_profile_api : any = "http://localhost:2100/profile";
  buynow_api : any = "http://localhost:2100/buynow"

  constructor(private http : HttpClient, private strSer:StorageService) { }
  getdata():Observable<Item[]>{
    return this.http.get<Item[]>(this.profile_api);
  }

  fetch_single_data(id:any):Observable<Item[]>{
      return this.http.get<Item[]>(`${this.single_api}/${id}`);
  }

  user_reg(formdata:any):Observable<User[]>{
      return this.http.post<User[]>(this.reg_api, formdata);
  }

  user_login(formdata:any):Observable<User[]>{
    return this.http.post<User[]>(this.log_api, formdata).pipe(catchError(this.errorHandler));
  }

  user_contact(formdata:any):Observable<Contact[]>{
     return this.http.post<Contact[]>(this.contact_api, formdata);
  }
  User_profile(uid:any):Observable<User[]>{
    // let data = this.strSer.getdata();
    // let uid = data[0].id;
    return this.http.get<User[]>(`${this.User_profile_api}/${uid}`);

  }

  buynow_create(formdata:any):Observable<Buynow[]>{
    return this.http.post<Buynow[]>(this.buynow_api, formdata);
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(() => error || "Server Error")
  }
}

