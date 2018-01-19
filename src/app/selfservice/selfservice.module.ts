import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { SharedModule } from '../shared';
import { TaskListComponent } from './tasklist.component';
import { LoanRequestComponent } from './loanrequest.component';
import { LeaveRequestComponent } from './leaverequest.component';
import { SelfServiceRoutingModule } from './selfservice-module.routing';
import { TaskDetailsComponent } from './taskdetails.component';
import { TaskList2Component } from './tasklist2.component';
import { LocaleModule, LocalizationModule, LocaleService, LocalizationService } from 'angular2localization';

@NgModule({
    imports: [SharedModule, SelfServiceRoutingModule],
    declarations: [TaskListComponent, TaskList2Component, LoanRequestComponent, LeaveRequestComponent, TaskDetailsComponent]
})
export class SelfServiceModule { }
