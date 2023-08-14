import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-buynow',
  templateUrl: './buynow.component.html',
  styleUrls: ['./buynow.component.css']
})
export class BuynowComponent implements OnInit {
  buynowInputValue !: FormGroup

  constructor(private userSer : UserService, private route:Router) { }

  ngOnInit(): void {
    this.buynowInputValue = new FormGroup({
      name: new FormControl(''),
      address: new FormControl(''),
      contact: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      pincode: new FormControl(''),
      email: new FormControl(''),
      card: new FormControl('')
     
    })
  }

  submitdata(){
    console.log(this.buynowInputValue.value);
    this.userSer.buynow_create(this.buynowInputValue.value).subscribe((res:any)=>{
      console.log("Submitted Data", res);
      if(res.status==200){
        alert("Your order is confirm");
        this.route.navigate(['/glasses']);
      }
      else{
        alert("your order is not confirm")
      }
      
    })
    

  }

}
