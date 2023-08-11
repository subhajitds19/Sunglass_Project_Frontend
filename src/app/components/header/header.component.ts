import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  token !: any;
  data !: any;
  name !: any;

  constructor(private strService : StorageService,
    private router:Router) { }

  ngOnInit(): void {
  }

  loggedIn(){
    this.token = this.strService.getToken();
    if(this.token){
      this.data = this.strService.getdata();
      //console.log("data from header", this.data);
      this.name = this.data[0].name;
      
    }
    return this.token;
  }
  logOut(){
    this.strService.getLocalDestroy();
    this.strService.getSessionDestroy();
    this.router.navigate(['/login']);
  }

}
