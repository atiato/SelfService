import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StoreHelper } from './store-helper';
import { Store } from '../store';
import { ApiService } from './api';
import { Observable } from 'rxjs/Observable';
import { SelfServiceService } from './selfservice.service';
import { ServiceBase, CompanySettings } from './servicebase';
import { NgRedux, select } from 'ng2-redux';
import { IAppState, LoggedInUser, LoginModel } from '../store';
import 'rxjs/Rx';

@Injectable()
export class AuthService extends ServiceBase implements CanActivate {
    JWT_KEY: string = 'retain_token';
    JWT: string = '';

    constructor(
        private storeHelper: StoreHelper,
        private store: Store,
        private apiServce: ApiService,
        private selfServiceService: SelfServiceService,
        private router: Router,
        private ngRedux: NgRedux<IAppState>) {
        super();
        const token = window.localStorage.getItem(this.JWT_KEY);
        if (token) {
            this.setJwt(token);
        }
    }

    get UserName(): string {
        return window.localStorage.getItem('username');
    }
    set UserName(userName: string) {
        window.localStorage.setItem('username', userName);
    }

    setJwt(jwt: string) {
        this.JWT = jwt;
        window.localStorage.setItem(this.JWT_KEY, jwt);
    }

    isAuthorized(): boolean {
        return Boolean(this.JWT);
    }

    canActivate(): boolean {
        const canActivate = this.isAuthorized();
        this.onCanActivate(canActivate);

        return canActivate;
    }

    onCanActivate(canActivate: boolean) {
        if (!canActivate) {
            this.router.navigate(['', 'auth']);
        }
    }

    authenticate(user): Observable<any> {
        let cs: CompanySettings = new CompanySettings();
        cs.company = user.company;
        cs.dbName = user.dbName;

        this.CompanySettings = cs;

        let x = `grant_type=password&username=${user.email}/${cs.dbName}/${cs.company}&password=${user.password}&client_id=People365App`;

        let lg: LoggedInUser = {};
        lg.userName = user.email;
        this.CurrentLoggedInUser = lg;

        return this.apiServce.postWindows(`/people365AuthorizationServer/token`, x)
            .do((res: any) =>
                this.setJwt(res.access_token))
            .map((res: any) =>
                res.data);
    }

    getUserInfo(): Observable<any> {
        return this.apiServce.getLinux('/api/Foundation/GetUserInfo/' + this.CurrentLoggedInUser.userName)
            .do((res: any) =>
                this.setUserInfo(res));
        //.subscribe(x => {
        //    this.setUserInfo(x);
        //});
        //.do((res: any) =>
        //    this.storeHelper.update('user', { 'id': res.UserName, 'userName': res.UserName }))
        //.map((res: any) => res.data);
    }

    setUserInfo(res: any) {
        let lg: LoggedInUser = {};
        lg.fullName = res.FullName;
        lg.personID = res.PersonID;
        lg.userID = res.UserID;
        lg.userName = res.UserName;
        lg.selectedRole = res.ParentRoles[0];

        this.CurrentLoggedInUser = lg;

        this.ngRedux.dispatch({ type: 'Update_User_Info', loggedInUser: lg });

        this.storeHelper.update('user', { 'id': res.UserName, 'userName': res.FullName });

        //this.selfServiceService.getSiteMap().subscribe();
    }

    signout() {
        this.JWT = '';
        window.localStorage.removeItem(this.JWT_KEY);
        this.store.purge();
        this.router.navigate(['', 'auth']);
    }

    getDataBaseName(companyName: string): Observable<any> {
        return this.apiServce.getWindows(`/people365MobileServices/api/Settings/GetDatabaseName?companyName=${companyName}`);
    }
}