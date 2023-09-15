import { Component } from '@angular/core';
import { members } from 'src/models/members';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent {

  member:members={};

  constructor(private api:ApiService, private router:Router){}

  addMember(){
    this.api.addMember(this.member).subscribe((data:any)=>{
      alert('Successfully Added')
      this.router.navigateByUrl('/library/members')
    })
  }

}
