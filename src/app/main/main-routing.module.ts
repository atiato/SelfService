import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainContainer } from './main.component';
import { TaskListComponent, LoanRequestComponent, LeaveRequestComponent} from '../selfservice';
import { AuthService } from '../services';
import { LandingComponent } from '../shared/landing.component';

const routes: Routes = [
    {
        path: 'main', canActivate: [AuthService], component: MainContainer,
        children: [
            { path: 'landing', component: LandingComponent },
            { path: 'selfservice', loadChildren: '../selfservice/selfservice.module#SelfServiceModule' },
            { path: 'dynamic', loadChildren: '../dynamicloading/add.module#AdAppModule' }
            //{ path: 'tasklist', component: TaskListComponent },
            //{ path: 'leaverequest', component: LeaveRequestComponent },
            //{ path: 'loanrequest', component: LoanRequestComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }