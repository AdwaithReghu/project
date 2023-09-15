import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewBookComponent } from './view-book/view-book.component';
import { AddBookComponent } from './add-book/add-book.component';
import { MembersComponent } from './members/members.component';
import { ViewMemberComponent } from './view-member/view-member.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { MainComponent } from './main/main.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  {
    path:'',redirectTo:'library/main',pathMatch:'full'
  },
  {
    path:'library/home',component:HomeComponent
  },
  {
    path:'library/viewBook/:id',component:ViewBookComponent
  },
  {
    path:'library/addBook',component:AddBookComponent
  },
  {
    path:'library/members',component:MembersComponent
  },
  {
    path:'library/viewMember/:id',component:ViewMemberComponent
  },
  {
    path:'library/addMember',component:AddMemberComponent
  },
  {
    path:'library/main',component:MainComponent
  },
  {
    path:'library/reports',component:ReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
