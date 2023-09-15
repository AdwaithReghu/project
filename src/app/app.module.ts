import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import { ViewBookComponent } from './view-book/view-book.component';
import { AddBookComponent } from './add-book/add-book.component';
import { FormsModule } from '@angular/forms';
import { MembersComponent } from './members/members.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ViewMemberComponent } from './view-member/view-member.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { MainComponent } from './main/main.component';
import { ReportsComponent } from './reports/reports.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ViewBookComponent,
    AddBookComponent,
    MembersComponent,
    FilterPipe,
    ViewMemberComponent,
    AddMemberComponent,
    MainComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
