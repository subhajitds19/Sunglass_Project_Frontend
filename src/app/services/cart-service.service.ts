import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../classes/item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  cart_api : any = "http://localhost:3000/cart"

  constructor(private http:HttpClient) { }

  cartData():Observable<Cart[]>{
    return this.http.get<Cart[]>(this.cart_api);
  }


  AddToCart(data:any):Observable<Cart[]>{
    return this.http.post<Cart[]>(this.cart_api, data);
  }

  updateQty(id:any, data:any):Observable<Cart[]>{
    return this.http.put<Cart[]>(`${this.cart_api}/${id}`, data);
  }
   
  cartDelete(id:any):Observable<Cart[]>{
     return this.http.delete<Cart[]>(`${this.cart_api}/${id}`);
  }

  cartSingleData(id:number):Observable<Cart[]>{
    return this.http.get<Cart[]>(`${this.cart_api}/${id}`);
  }

  deleteByEmail(id:string):Observable<Cart[]>{
    return this.http.delete<Cart[]>(`${this.cart_api}/${id}`);
  }
}

//npx json-server --watch src/assets/Data/db.json
