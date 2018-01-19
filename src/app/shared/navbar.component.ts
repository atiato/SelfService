import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '../store';
import { Router } from '@angular/router';
import { AuthService } from '../services';

@Component({
    selector: 'navbar',
    templateUrl: 'navbar.component.html'
})
export class Navbar {
    UserName: String;

    subscription: any;

    constructor(private store: Store, private router: Router, private authService: AuthService) {
        this.subscription = this.store.changes
            .map(data => data.user)
            .subscribe(user => {
                this.UserName = user ? user.userName : '';
            });
    }

    logout() {
        this.authService.signout();
        this.router.navigate(['', 'auth']);
    }

    ngOnInit() {
        this.authService.getUserInfo();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}