import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit{

  allMembers:any[]=[];
  searchKey:string='';
  assignedMembers: any[] = [];
  notAssignedMembers: any[] = [];
  currentFilter: string = 'All';

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.getAllMembers();
  }

  getAllMembers(){
    this.api.getAllMembers().subscribe((result:any)=>{
      this.allMembers=result;
      this.assignedMembers = this.allMembers.filter((member: any) => member.book === 'Assigned');
      this.notAssignedMembers = this.allMembers.filter((member: any) => member.book === 'Not Assigned');
      console.log(this.notAssignedMembers);
    })
  }

  search(event:any){
    this.searchKey=event.target.value
    this.filterMembers();
  }

  filterMembers() {
    if (this.currentFilter === 'Assigned') {
      this.assignedMembers = this.allMembers.filter(
        (member: any) =>
          member.book === 'Assigned' &&
          member.name.toLowerCase().includes(this.searchKey.toLowerCase())
      );
    } else if (this.currentFilter === 'Not Assigned') {
      this.notAssignedMembers = this.allMembers.filter(
        (member: any) =>
          member.book === 'Not Assigned' &&
          member.name.toLowerCase().includes(this.searchKey.toLowerCase())
      );
    } else {
      this.assignedMembers = this.allMembers.filter((member: any) =>
        member.book === 'Assigned' &&
        member.name.toLowerCase().includes(this.searchKey.toLowerCase())
      );
      this.notAssignedMembers = this.allMembers.filter((member: any) =>
        member.book === 'Not Assigned' &&
        member.name.toLowerCase().includes(this.searchKey.toLowerCase())
      );
    }
  }

  filterByStatus(status: string) {
    this.currentFilter = status;
    this.searchKey = ''; // Clear the search when a filter button is clicked

    if (status === 'Assigned') {
      this.filterMembers();
    } else if (status === 'Not Assigned') {
      this.filterMembers();
    } else {
      this.filterMembers();
    }
  }

}
