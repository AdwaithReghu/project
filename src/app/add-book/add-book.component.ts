import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { books } from 'src/models/books';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent{

  book:books={};

  constructor(private api:ApiService, private router:Router){}

  addBook(){
    this.api.addBook(this.book).subscribe((data:any)=>{
      alert('Successfully Added')
      this.router.navigateByUrl('')
    })
  }

}
