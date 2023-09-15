import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit{

  bookId:any='';
  book:any=[];
  status:any='';

  constructor(private activatedRoute:ActivatedRoute, private api:ApiService, private router:Router){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data:any)=>{
      this.bookId=data.id
      this.api.viewBook(this.bookId).subscribe((result:any)=>{
        this.book=result;
        this.status=result.status
        console.log(this.status);
      })
    })
  }

  deleteBook(dId:any){
    if(window.confirm('Are you sure you want to remove this book from the library?')){
      this.api.deleteBook(dId).subscribe((result:any)=>{
        alert('Book Removed')
        this.router.navigateByUrl('')
      })
    }
  }

  updateBook(){
    this.api.updateBook(this.bookId,this.book).subscribe((result:any)=>{
      alert('Details Updated')
      location.reload()
    })
  }

  navigateToReportsPage() {
    this.api.setHighlight(this.book.id)
    this.router.navigate(['/library/reports']);
  }

}
