import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginInputValue!: FormGroup;
  changetype: boolean = true;
  visible: boolean = true;

  constructor() { }

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
  }

}
