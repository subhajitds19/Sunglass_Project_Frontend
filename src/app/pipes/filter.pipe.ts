import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: string[], searchTxt: string):  string[] {
    if(searchTxt===''){
      return value;
     }
     else{
      return value.filter((item:string)=>item.toLowerCase().startsWith(searchTxt.toLowerCase()));
      //return value.filter((item:string)=>item.toLowerCase().includes(searchTxt.toLowerCase()));
  
     }
  }

}
