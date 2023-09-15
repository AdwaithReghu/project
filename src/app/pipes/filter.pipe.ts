import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allBooks:any[],searchKey:string,propName:string): any[] {
    const result:any=[];

    if(!allBooks||searchKey==''||propName==''){
      return allBooks;
    }
    allBooks.forEach((book:any)=>{
      if(book[propName].trim().toLowerCase().includes(searchKey.toLowerCase().trim())){
        result.push(book)
      }
    })
    return result;
  }

  

}
