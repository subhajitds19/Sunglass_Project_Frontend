import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-glasses',
  templateUrl: './glasses.component.html',
  styleUrls: ['./glasses.component.css']
})
export class GlassesComponent implements OnInit {
  userDetails : any = [];
  baseUrl : any = "http://localhost:2100/";
  folderPath : string = "upload/";
  image_path : any = "";
  searchedGlasses : any = [];
  totalRows : number = 0;
  page : number = 1;
  allUserDetails : any = [];

  constructor(private apiservice:UserService) { }

  ngOnInit(): void {
    this.apiservice.getdata().subscribe((res:any)=>{
      //console.log(res);
      // if(res.data.status == true){
      this.allUserDetails = res.data;
      this.userDetails = this.allUserDetails.filter((data:any)=>data.status==true);
      console.log(this.userDetails);
      
      if(this.userDetails.image == "undefined" || this.userDetails.image == "")
      {
        this.image_path = "assets/images/no-user.jpg";
      }
      else{
        this.image_path = this.baseUrl + this.folderPath;
        console.log("image", this.image_path);
        
      }
    // }
      
      

    })
  
  }
  onSearch(search:any){
     console.log(search.value);
     let value = search.value;
     if(value.length >= 2){
      this.searchedGlasses = this.userDetails.filter((data:any)=>{
        return data.itemName.toLowerCase().includes(value.toLowerCase())
      });
      console.log(this.searchedGlasses);
      
     }
  }

}
