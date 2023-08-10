import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactFormValue!: FormGroup;

  constructor(private userSer:UserService) { }

  ngOnInit(): void {
    this.contactFormValue = new FormGroup({
      name: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      message: new FormControl(''),
    })
  }

  submitData() {
    console.log("Collect Form Value:", this.contactFormValue.value);
    this.userSer.user_contact(this.contactFormValue.value).subscribe((res:any)=>{
      console.log(res);
      if(res.status==200){
        alert("Your query Successfully send")
      }else{
        alert("try Again")
      }
      
    })
  }

}
