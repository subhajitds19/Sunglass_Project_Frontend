import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  regValue!: FormGroup;
  setectedImg!: File;
  changeType: boolean = true;
  visiable: boolean = true;

  constructor(private userSer:UserService, private route:Router) { }

  ngOnInit(): void {
    this.regValue = new FormGroup({
      

      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern("^[A-Z]{1}[a-z]{2,}$")]),
      email: new FormControl('', [Validators.required, Validators.pattern("([a-z0-9.-]+)@([a-z]{2,15}).([a-z.]{2,10})$")]),
      contact: new FormControl('', [Validators.required, Validators.pattern("^[6-9]{1}[0-9]{9}$")]),
      password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,15}$")]),
    });
  }

  view() {
    this.changeType = !this.changeType;
    this.visiable = !this.visiable
  }

  onFileSelection(event: any) {
    this.setectedImg = event.target.files[0];
    console.log("image:", this.setectedImg);

  }

  onSubmit() {
    console.log("Form value Recived:", this.regValue.value);
    const formdata : FormData = new FormData();

    formdata.append('name', this.regValue.value.name)
    formdata.append('contact', this.regValue.value.contact)
    formdata.append('email', this.regValue.value.email)
    formdata.append('password', this.regValue.value.password)
    formdata.append('image', this.setectedImg, this.setectedImg.name)
    this.userSer.user_reg(formdata).subscribe((res:any)=>{
         console.log("reg", res);
         alert("Registration Successfully");
         this.route.navigate(['/login']);
         
    })
  }

}
