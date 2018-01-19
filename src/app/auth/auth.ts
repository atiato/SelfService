import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services';
import '../../assets2/js/neon-login.js';
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../store';

declare var showLogin: any;
declare var showLogin2: any;

@Component({
    selector: 'auth-container',
    templateUrl: 'auth.html'
})
export class Auth implements AfterViewInit {
    myForm: FormGroup;


    //constructor(private ngRedux: NgRedux<IAppState>) {
    //}

    constructor(private router: Router, private authService: AuthService, private fb: FormBuilder,
        private ngRedux: NgRedux<IAppState>) {
        this.myForm = fb.group({
            'userName': ['', Validators.required],
            'password': ['', Validators.required],
            'company': ['', Validators.required]
        });
    }

    user = {
        email: '',
        password: '',
        company: '',
        dbName: ''
    }

    mode: string = 'signin';
    linkText: string = 'Don\'t have an account?';

    changeMode() {
        if (this.mode === 'singin') {
            this.mode = 'singup';
            this.linkText = 'Already have an account?';
        }
        else {
            this.mode = 'singin';
            this.linkText = 'Don\'t have an account?';
        }
    }

    authenticate() {
        this.user.company = this.myForm.value['company'];

        this.authService.getDataBaseName(this.user.company).subscribe(dbName => {
            this.user.email = this.myForm.value['userName'];
            this.user.password = this.myForm.value['password'];
            this.user.dbName = dbName;

            this.authService.authenticate(this.user)
                .subscribe(() => {

                    this.authService.getUserInfo()
                        .subscribe((userInfo) => {

                            //this.ngRedux.dispatch({ type: 'Update_User_Info', userName: this.user.email });

                            this.router.navigate(['main/selfservice', 'tasklist'])
                        })
                },
                err =>
                    showLogin2()
                );
        });
    }

    ngAfterViewInit() {
        showLogin();
    }
}