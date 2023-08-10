import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileDetails : any = {};
  baseUrl : any = "http://localhost:2100/";
  folderPath : string = "upload/";
  image_path : any = "";

  constructor(private userSer : UserService, private strSer:StorageService) { }

  ngOnInit(): void {
    let data = this.strSer.getdata();
    console.log("data=",data);
    let uid = data[0].id;
    
    this.userSer.User_profile(uid).subscribe((res:any)=>{
      console.log(res);
      this.profileDetails = res.data;
      console.log("this.profileDetails ", this.profileDetails );
      if(this.profileDetails.image == "undefined" || this.profileDetails.image == "")
      {
        this.image_path = "assets/images/no-user.jpg";
      }
      else{
        this.image_path = this.baseUrl + this.folderPath;
        console.log("image", this.image_path);
        
      }
      
      
    })
   }

}
