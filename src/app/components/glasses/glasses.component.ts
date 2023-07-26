import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-glasses',
  templateUrl: './glasses.component.html',
  styleUrls: ['./glasses.component.css']
})
export class GlassesComponent implements OnInit {
  userDetails : any = [];
  baseUrl : any = "http://localhost:2400/";
  folderPath : string = "upload/";
  image_path : any = "";

  constructor(private apiservice:UserService) { }

  ngOnInit(): void {
    this.apiservice.getdata().subscribe((res:any)=>{
      //console.log(res);
      this.userDetails = res.data;
      console.log(this.userDetails);
      
      if(this.userDetails.image == "undefined" || this.userDetails.image == "")
      {
        this.image_path = "assets/images/no-user.jpg";
      }
      else{
        this.image_path = this.baseUrl;
        console.log("image", this.image_path);
        
      }
      
      

    })
  }

}
