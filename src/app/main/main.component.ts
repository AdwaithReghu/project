import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  assign:any={};
  return:any={};
  books:any[]=[];
  returnBooks:any[]=[];
  returnMember:any[]=[];
  members:any[]=[];
  history:any[]=[];
  selectedBookId:any='';
  returnedBookId:any='';
  selectedMemberId:any='';
  returnedMemberId:any='';
  selectedBookName:any='';
  returnedBookName:any='';
  selectedMemberName:any='';
  returnedMemberName:any='';
  date:any='';
  dueAmount:any='';
  selectedReturnMemberId: string = '';
  before:any;
  first:any;  

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.getAllBooks()
    this.getAllMembers()
    this.getHistory()
  }

  getAllBooks(){
    this.api.getAllBooks().subscribe((result:any)=>{
      this.books = result.filter((book: any) => book.status === 'Available');      
      this.returnBooks = result.filter((book:any)=>book.status === 'Not Available')
      console.log(this.returnBooks);
    })
  }

  getAllMembers(){
    this.api.getAllMembers().subscribe((result:any)=>{
      this.members=result.filter((member:any)=>member.book !== 'Assigned');
      this.returnMember = result.filter((member:any)=>member.book === 'Assigned')
      console.log(this.returnMember);
    })
  }

  getHistory(){
    this.api.getHistory().subscribe((data:any)=>{
    this.history=data
    })
  }

  setSelectedBookId(bookName: string) {
    const selectedBook = this.books.find((book) => book.name === bookName);
    if (selectedBook) {
      this.selectedBookId = selectedBook.id;
    } else {
      this.selectedBookId = '';
    }
  }

  returnBookId(bookName:string){
    console.log('input',bookName);
    const returnBook = this.returnBooks.find((book) => book.name === bookName);
    if (returnBook) {
      this.returnedBookId = returnBook.id;
    } else {
      this.returnedBookId = '';
    }
  }
  
  getBookNameForMember(memberName: string): string {
    console.log(memberName);
    const returnMember = this.returnMember.find((member) => member.name === memberName);
    if (returnMember) {
      this.returnBookId(returnMember.bookname)
      return returnMember.bookname;
    }
    return '';
  }

  setSelectedMemberId(memberName:string){
    const selectedMember = this.members.find((member) => member.name === memberName);
    if (selectedMember) {
      this.selectedMemberId = selectedMember.id;
      this.first=selectedMember.dues
      console.log(this.first);
    } else {
      this.selectedMemberId = '';
    }
  }

  returnMemberId(memberName:string){
    const returnedMember = this.returnMember.find((member) => member.name === memberName);
    if (returnedMember) {
      this.returnedMemberId = returnedMember.id;
      this.before=returnedMember.dues
    } else {
      this.returnedMemberId = '';
    }
  }

  assignBook(bookForm: NgForm) {
    if (bookForm.valid) {
      const selectedBook = this.books.find((book) => book.id === this.selectedBookId); 
      if (selectedBook) {
        this.assign = { 
          id: this.history.length + 1,
          bookId: this.selectedBookId,
          memberId: this.selectedMemberId,
          action: 'Book Assigned',
          date: bookForm.value.date,
          dueAmount: bookForm.value.dueAmount,
          bookName: selectedBook.name, 
        };
        this.api.addToHistory(this.assign).subscribe((data: any) => {
          alert('Book Assigned');
        });
        this.bookStatus(this.selectedBookId);
        this.memberStatus(this.selectedMemberId, bookForm.value.dueAmount, selectedBook.name); 
        bookForm.reset();
      } else {
        alert('Selected book not found.');
      }
    } else {
      alert('Something went wrong');
    }
  }
  

  bookStatus(id: any) {
    this.api.viewBook(id).subscribe((data: any) => {
      data.status = 'Not Available';
      this.api.bookStatus(id, data).subscribe((result: any) => {});
    });
  }

  memberStatus(id: any, due: any, bookName: string) {
    this.api.viewMember(id).subscribe((data: any) => {
      data.book = 'Assigned';
      data.bookname = bookName;
      data.dues = parseFloat(this.first) - parseFloat(due);
      this.api.memberStatus(id, data).subscribe((result: any) => {});
    });
  }
  
  bookReturn(returnForm: NgForm) {
    if (returnForm.valid) {
      if (this.isBookAssignedToMember(this.returnedBookId, this.returnedMemberId)) {
        this.return = {
          id: this.history.length + 1,
          bookId: this.returnedBookId,
          memberId: this.returnedMemberId,
          action: 'Book Returned',
          date: returnForm.value.date,
          dueAmount: returnForm.value.paidAmount,
        };
        this.api.addToHistory(this.return).subscribe((data: any) => {
          alert('Book Returned');
        });
        this.returnBookStatus(this.returnedBookId);
        this.returnMemberStatus(this.returnedMemberId, returnForm.value.paidAmount);
        returnForm.reset();
      } else {
        alert('The selected book is not assigned to the selected member.');
      }
    } else {
      alert('Something went wrong');
    }
  }
  

  isBookAssignedToMember(bookId: string, memberId: string): boolean {
    const bookAssignment = this.history.find(
      (entry) =>
        entry.bookId === bookId &&
        entry.memberId === memberId &&
        entry.action === 'Book Assigned'
    );
    return !!bookAssignment;
  }

  returnBookStatus(id:any){
    this.api.viewBook(id).subscribe((data:any)=>{
      data.status = 'Available';
      this.api.bookStatus(id,data).subscribe((result:any)=>{})
    })
  }

  returnMemberStatus(id:any, paid:any){
    this.api.viewMember(id).subscribe((data:any)=>{
      data.book='Not Assigned';
      console.log(this.before,paid);
      data.dues= parseFloat(this.before) + parseFloat(paid);
      this.api.memberStatus(id,data).subscribe((result:any)=>{})
    })
  }

}