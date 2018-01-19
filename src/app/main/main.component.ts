import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, SelfServiceService } from '../services';
declare var jQuery: any;

@Component({
    selector: 'main-container',
    templateUrl: 'main.component.html'
})
export class MainContainer implements OnInit {
    constructor(
        private router: Router,
        private selfServiceService: SelfServiceService,
        private authService: AuthService) {

    }

    ngOnInit() {
        //this.selfServiceService.getAttendanceTypes().subscribe();

        if (this.router.url == '/main') {
            this.router.navigate(['main', 'landing']);
        }
    }

    test() {
        //let mainMenu = jQuery('#main-menu');
    }

    logout() {
        this.authService.signout();
        window.localStorage.clear();
        this.router.navigate(['', 'auth']);
    }
}