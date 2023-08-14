import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginInputValue!: FormGroup;
  changetype: boolean = true;
  visible: boolean = true;
  serverError : any;
  

  constructor(private userSer:UserService,
    private storeService:StorageService,
    private router:Router) { }

  ngOnInit(): void {
    this.loginInputValue = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("([a-z0-9.-]+)@([a-z]{2,15}).([a-z.]{2,10})$")]),
      password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,15}$")])
    })
  }

  view() {
    this.changetype = !this.changetype;
    this.visible = !this.visible;
  }

  submitData() {
    console.log("login Form Data:", this.loginInputValue.value);
    this.userSer.user_login(this.loginInputValue.value).subscribe((res:any)=>{
      console.log(res);
      let userResponse = res;
      if(res.status==200){
        alert(userResponse.msg);
         this.storeService.setdata(userResponse.user.name,
                                   userResponse.user.contact,
                                  userResponse.user.email,
                                 
                                  userResponse.user._id,
                                  userResponse.token)
                                  this.router.navigate(['/glasses']);
      }
      else{
        alert(userResponse.message);
        this.loginInputValue.reset();
      }
      
    },
    (err)=>{
      console.log("Http Error", err);
      this.serverError = err.error.message;
      alert(this.serverError);
      console.log("error in register", this.serverError);
      console.log("Error in reg: server error");
    }
    )
    
  }

}
