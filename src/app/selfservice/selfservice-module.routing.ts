import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskListComponent } from '../selfservice';
import { LoanRequestComponent } from './loanrequest.component';
import { LeaveRequestComponent } from './leaverequest.component';
import { TaskDetailsComponent } from './taskdetails.component';
import { TaskList2Component } from './tasklist2.component';

const routes: Routes = [
    { path: 'tasklist', component: TaskListComponent },
    { path: 'tasklist2', component: TaskList2Component },
    { path: 'leaverequest', component: LeaveRequestComponent },
    { path: 'loanrequest', component: LoanRequestComponent },
    { path: 'taskdetails/:taskid/:instanceid', component: TaskDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SelfServiceRoutingModule { }