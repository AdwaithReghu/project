import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  allBooks:any[]=[];
  status:any='';
  searchKey:string='';
  availableBooks: any[] = [];
  notAvailableBooks: any[] = [];
  currentFilter: string = 'All';

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks(){
    this.api.getAllBooks().subscribe((result:any)=>{
      this.allBooks=result;
      this.status=result.status;
      this.availableBooks = this.allBooks.filter((book: any) => book.status === 'Available');
      this.notAvailableBooks = this.allBooks.filter((book: any) => book.status === 'Not Available');    })
  }

  search(event:any){
    this.searchKey = event.target.value
    this.filterBooks();
  }

  filterBooks() {
    if (this.currentFilter === 'Available') {
      this.availableBooks = this.allBooks.filter(
        (book: any) =>
          book.status === 'Available' &&
          book.name.toLowerCase().includes(this.searchKey.toLowerCase())
      );
    } else if (this.currentFilter === 'Not Available') {
      this.notAvailableBooks = this.allBooks.filter(
        (book: any) =>
          book.status === 'Not Available' &&
          book.name.toLowerCase().includes(this.searchKey.toLowerCase())
      );
    } else {
      this.availableBooks = this.allBooks.filter((book: any) =>
        book.name.toLowerCase().includes(this.searchKey.toLowerCase())
      );
      this.notAvailableBooks = this.allBooks.filter(
        (book: any) => book.status === 'Not Available'
      );
    }
  }

  filterByStatus(status: string) {
    this.currentFilter = status;
    this.searchKey = ''; // Clear the search when a filter button is clicked

    if (status === 'Available') {
      this.filterBooks();
    } else if (status === 'Not Available') {
      this.filterBooks();
    } else {
      this.filterBooks();
    }
  }

}
