import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartServiceService } from 'src/app/services/cart-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  single_details!:any
  details_id!:any
  baseUrl : any = "http://localhost:2100/";
  folderPath : string = "upload/";
  image_path : any = "";
  cartDetails : any;
  exitingCart : any = {};
  CartProduct : any = {};
  email:any

  constructor( private userSer:UserService,
    private aRoute:ActivatedRoute, private cartSer:CartServiceService, private route : Router) { }

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params:any)=>{
        this.details_id = params.get('id');
        console.log('id=', this.details_id);

        this.userSer.fetch_single_data(this.details_id).subscribe((res:any)=>{
          console.log(res);
          this.single_details = res.data;
          this.image_path = this.baseUrl+this.folderPath;
        })
        
    })
  }

  addtocart(details:any){
    this.cartDetails = details;
    console.log(this.cartDetails);
    this.email = window.localStorage.getItem('email');
    
    if(!this.email){
      alert('You need to login first to view the webpage ')
      this.route.navigate(['/login']);
  }
  else{

    this.cartSer.cartData().subscribe((res:any)=>{
      console.log(res);
      let allCartProduct = res;
      let product_id = allCartProduct.findIndex((x : any)=>x._id == this.cartDetails._id && x.email == window.localStorage.getItem('email'));
      console.log("product_id=", product_id);
      if(product_id == -1){
        
    let cart_product = {
      ...this.cartDetails,
      email : window.localStorage.getItem('email'),
      quantity : 1,
      sub_total : Number(this.single_details.price)
    }
     
    
    this.cartSer.AddToCart(cart_product).subscribe((res:any)=>{
      console.log(res);
       this.CartProduct = res;
      console.log("CartProduct", this.CartProduct);
      alert("Add To cart Successfully");
      this.route.navigate(['/cart']);
      
      
    });

      }
      else{
        this.exitingCart = allCartProduct.find((x:any)=>x._id==this.cartDetails._id && x.email == window.localStorage.getItem('email'));
        console.log("exitingCart=", this.exitingCart);
        let newData = {
          ...this.exitingCart,
          email:window.localStorage.getItem('email'),
          quantity : this.exitingCart?.quantity+1,
          sub_total : this.exitingCart?.sub_total + Number(this.single_details.price)
        }
        this.cartSer.updateQty(this.exitingCart.id, newData).subscribe((res:any)=>{
          this.CartProduct = res;
          console.log("CartProduct", this.CartProduct);
          alert("Add To cart Successfully");
          this.route.navigate(['/cart']);
          
        })
      }
      
      
    })
  }

    


  }

}
