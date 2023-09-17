import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { books } from 'src/models/books';
import { members } from 'src/models/members';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl='http://localhost:3000/books';
  baseUrl1='http://localhost:3000/members';
  baseUrl2='http://localhost:3000/history';
  selectedId:any;

  constructor(private http:HttpClient) { }

  // to get all books
  getAllBooks():Observable<books>{
    return this.http.get(this.baseUrl)
  }

  // to view a particular book
  viewBook(id:any){
    return this.http.get(`${this.baseUrl}/${id}`)
  }

  // to add a new book
  addBook(bookBody:any){
    return this.http.post(this.baseUrl,bookBody)
  }

  // to delete a book
  deleteBook(dId:any){
    return this.http.delete(`${this.baseUrl}/${dId}`)
  }

  // to get all members
  getAllMembers():Observable<members>{
    return this.http.get(this.baseUrl1)
  }

  // to view a particular member
  viewMember(id:any){
    return this.http.get(`${this.baseUrl1}/${id}`)
  }

  // to delete a member
  deleteMember(dId:any){
    return this.http.delete(`${this.baseUrl1}/${dId}`)
  }

  // to add new member
  addMember(memberBody:any){
    return this.http.post(this.baseUrl1,memberBody)
  }

  // to update book details
  updateBook(id:any,bookBody:any){
    return this.http.put(`${this.baseUrl}/${id}`,bookBody)
  }

  // to update member details
  updateMember(id:any,memberBody:any){
    return this.http.put(`${this.baseUrl1}/${id}`,memberBody)
  }

  // to add to history
  addToHistory(historyBody:any){
    return this.http.post(this.baseUrl2,historyBody)
  }

  // to get history
  getHistory(){
    return this.http.get(this.baseUrl2)
  }

  // to update status of a book
  bookStatus(Id:any,bookBody:any){
    return this.http.put(`${this.baseUrl}/${Id}`,bookBody)
  }

  // to update status of a member
  memberStatus(id:any,memberBody:any){
    return this.http.put(`${this.baseUrl1}/${id}`,memberBody)
  }

  // to share the highlighted report
  setHighlight(id:any){
    this.selectedId=id;
  }

  getHighlight(){
    return this.selectedId
  }

}
