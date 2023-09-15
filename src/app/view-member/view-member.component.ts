import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-member',
  templateUrl: './view-member.component.html',
  styleUrls: ['./view-member.component.css']
})
export class ViewMemberComponent implements OnInit{

  memberId:any='';
  member:any='';

  constructor(private api:ApiService, private activatedRoute:ActivatedRoute, private router:Router){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((result:any)=>{
      this.memberId=result.id
      this.api.viewMember(this.memberId).subscribe((data:any)=>{
        this.member=data;
      })
    })
  }

  deleteMember(dId:any){
    if(window.confirm('Are you sure you want to remove this member?')){
      this.api.deleteMember(dId).subscribe((result:any)=>{
        alert('Member Removed')
        this.router.navigateByUrl('/library/members')
      })
    }
  }

  updateMember(){
    this.api.updateMember(this.memberId,this.member).subscribe((result:any)=>{
      alert('Details Updated')
      location.reload()
    })
  }

}
