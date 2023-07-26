import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactFormValue!: FormGroup;

  constructor() { }

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
  }

}
