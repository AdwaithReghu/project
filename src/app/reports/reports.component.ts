import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit{

  history:any[]=[];
  books:any[]=[];
  members:any[]=[];
  selectedId:any;

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.selectedId=this.api.getHighlight()
    this.api.getHistory().subscribe((data:any)=>{
      this.history=data
    })
    this.fetchBookAndMemberDetails();
  }

  fetchBookAndMemberDetails() {
    const bookIds = this.history.map((record) => record.bookId);
    const memberIds = this.history.map((record) => record.memberId);

    this.api.viewBook(bookIds).subscribe((booksData: any) => {
      this.books = booksData;
    });

    this.api.viewMember(memberIds).subscribe((membersData: any) => {
      this.members = membersData;
    });
  }

  getBookName(bookId: string): string {
    const book = this.books.find((b) => b.id === bookId);
    return book ? book.name : '';
  }

  getMemberName(memberId: string): string {
    const member = this.members.find((m) => m.id === memberId);
    return member ? member.name : '';
  }

  getMemberDues(memberId: string): string {
    const member = this.members.find((m) => m.id === memberId);
    return member ? member.dues : '';
  }

  hasReturnDate(hist: any): boolean {
    return this.history.some((returnHist) =>
      returnHist.action === 'Book Returned' &&
      returnHist.bookId === hist.bookId &&
      returnHist.memberId === hist.memberId
    );
  }

  getDuesTextColor(dues: string): string {
    const duesAsNumber = parseFloat(dues); // Convert the string to a number
    return duesAsNumber < 0 ? 'red' : 'green';
  }

}
