import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartServiceService } from 'src/app/services/cart-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  allCartProducts : any = [];
  cartProducts : any=[];
  baseUrl : any = "http://localhost:2100/";
  folderPath : string = "upload/";
  image_path : any = "";
  grandtotal : number = 0;
  newIncData : any ;
  newDecData : any;
  allCart : any = {};
 

  constructor(private cartSer : CartServiceService, private router:Router) { }

  ngOnInit(): void {
    
    
    this.cartSer.cartData().subscribe((res:any)=>{
      this.allCartProducts = res;
      this.cartProducts = this.allCartProducts.filter((data:any)=>data.email == window.localStorage.getItem('email'));
     for(let i = 0; i < this.cartProducts.length; i++){
      this.grandtotal += this.cartProducts[i].sub_total;
     }
      this.image_path = this.baseUrl+this.folderPath;
    });
    // this.grandTotal();
  
  }

  delete(id:any){
    this.cartSer.cartDelete(id).subscribe((res:any)=>{
      console.log("Cart Delete", res);
      this.cartSer.cartData().subscribe((res:any)=>{
        this.allCartProducts = res;
        this.cartProducts = this.allCartProducts.filter((data:any)=>data.email == window.localStorage.getItem('email'));
        this.grandtotal = 0;
        for(let i = 0; i < this.cartProducts.length; i++){
          this.grandtotal += this.cartProducts[i].sub_total;
         }
      })
      
    });
   
  }
  inc(id : any){
    this.cartSer.cartSingleData(id).subscribe((res:any)=>{
      this.newIncData = {
        ...res,
        quantity : res.quantity+1,
        sub_total : res.sub_total + Number(res.price)
      }
      this.cartSer.updateQty(id, this.newIncData).subscribe((res:any)=>{
        this.allCart = res;
        console.log("allCart=", this.allCart);
        this.cartSer.cartData().subscribe((res:any)=>{
          this.allCartProducts = res;
          this.cartProducts = this.allCartProducts.filter((data:any)=>data.email == window.localStorage.getItem('email'));
          this.grandtotal = 0;
          for(let i = 0; i < this.cartProducts.length; i++){
            this.grandtotal += this.cartProducts[i].sub_total;
          }
        })
      })

    })

  }
  dec(id:any){
    this.cartSer.cartSingleData(id).subscribe((res:any)=>{
      if(res.quantity > 1){
      this.newDecData = {
        ...res,
        quantity : res.quantity-1,
        sub_total : res.sub_total - Number(res.price)
      }
      this.cartSer.updateQty(id, this.newDecData).subscribe((res:any)=>{
        this.allCart = res;
        console.log("allCart=", this.allCart);
        this.cartSer.cartData().subscribe((res:any)=>{
          this.allCartProducts = res;
          this.cartProducts = this.allCartProducts.filter((data:any)=>data.email == window.localStorage.getItem('email'));
          this.grandtotal = 0;
          for(let i = 0; i < this.cartProducts.length; i++){
            this.grandtotal += this.cartProducts[i].sub_total;
          }
        })
      })
    }else{
      this.cartSer.cartDelete(id).subscribe((res:any)=>{
        console.log("Cart Delete", res);
        this.cartSer.cartData().subscribe((res:any)=>{
          this.allCartProducts = res;
          this.cartProducts = this.allCartProducts.filter((data:any)=>data.email == window.localStorage.getItem('email'));
          this.grandtotal = 0;
          for(let i = 0; i < this.cartProducts.length; i++){
            this.grandtotal += this.cartProducts[i].sub_total;
          }
        })
        
      });

    }

    })

  }

  deleteByEmail(){
    // let cartEmail = window.localStorage.getItem('email');
    // console.log("cartEmail=", typeof(cartEmail));
    // this.cartSer.deleteByEmail(String(cartEmail)).subscribe((res:any)=>{
    //   console.log(res);
    // })
    // this.cartSer.cartData().subscribe((res:any)=>{
    //   this.allCartProducts = res;
    //   this.cartProducts = this.allCartProducts.filter((data:any)=>data.email == window.localStorage.getItem('email'));
     
    //   for(let i = 0; i < this.cartProducts.length; i++){
    //     let id = this.cartProducts[i].id;
    //      this.cartSer.deleteByEmail(id).subscribe((res:any)=>{
    //   console.log(res);
    // })
    //   }
    //   this.cartSer.cartData().subscribe((res:any)=>{
    //     this.allCartProducts = res;
    //     this.cartProducts = this.allCartProducts.filter((data:any)=>data.email == window.localStorage.getItem('email'));

    //   })
    // })

   
    
      this.router.navigate(['/buynow']);
    
    
  }

  // grandTotal(){
  //  for(let p =0; p < this.cartProducts.length(); p++){
  //   console.log("a=", p);
    
  //  }
    

  // }
}




