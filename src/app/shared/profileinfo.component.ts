import { Component, Input, AfterViewInit } from '@angular/core';
import { Store, IAppState, LoggedInUser } from '../store';
import { Router } from '@angular/router';
import { AuthService } from '../services';
import { NgRedux, select } from 'ng2-redux';

@Component({
    selector: 'profileinfo',
    template: `<!-- Profile Info -->
                    <li class="profile-info dropdown">
                        <!-- add class "pull-right" if you want to place this from right -->

                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <img src="../assets2/images/thumb-1@2x.png" alt="" class="img-circle" width="44" />
                        {{ userName | async }}
                        </a>
                        <ul class="dropdown-menu">

                            <!-- Reverse Caret -->
                            <li class="caret"></li>

                            <!-- Profile sub-links -->
                            <li>
                                <a href="extra-timeline.html">
                                    <i class="entypo-user"></i>
                                    Edit Profile
                                </a>
                            </li>

                            <li>
                                <a routerLinkActive="active" (click)="router.navigate(['main/selfservice', 'tasklist'])">
                                    <i class="entypo-clipboard"></i>
                                    Tasks
                                </a>
                            </li>
                        </ul>
                    </li>`
})
export class ProfileInfoComponent {
    //@select(['loggedInUser', 'fullName']) loggedInUser;
    //@select((s: IAppState) => s.loggedInUser.fullName) loggedInUser;

    //@select((s: IAppState) => s.userName) userName;
    @select() userName;

    //subscription: any;
    //UserName: String;

    constructor(private store: Store,
        private router: Router,
        private ngRedux: NgRedux<IAppState>,
        private authService: AuthService) {
        //this.subscription = this.store.changes
        //    .map(data => data.user)
        //    .subscribe(user => {
        //        this.UserName = user ? user.userName : '';
        //    });

        ngRedux.subscribe(() => {
            //console.log(ngRedux.getState());
            //this.UserName = ngRedux.getState().loggedInUser.fullName;
            //this.UserName = ngRedux.getState().userName;
            console.log('test');
        });

        //this.authService.getUserInfo().subscribe();

        console.log('test');
    }

    test() {
        this.authService.getUserInfo().subscribe();
    }

    logout() {
        this.authService.signout();
        this.router.navigate(['', 'auth']);
    }

    ngOnInit() {
        //this.authService.getUserInfo()
        //    .subscribe();
    }

    ngOnDestroy() {
        //this.subscription.unsubscribe();
    }
}

/*
import { Component } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../../store';
import { CLEAR_TODOS } from '../../actions';

@Component({
  selector: 'app-todo-dashboard',
  templateUrl: './todo-dashboard.component.html',
  styleUrls: ['./todo-dashboard.component.css']
})
export class TodoDashboardComponent {
  @select() todos;
  @select() lastUpdate;

  constructor(private ngRedux: NgRedux<IAppState>) {
  }

  clearTodos() {
    this.ngRedux.dispatch({ type: CLEAR_TODOS });
  }
}

*/