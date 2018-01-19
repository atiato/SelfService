import { Injectable } from '@angular/core';
import { ApiService } from './api';
import { Observable } from 'rxjs/Observable';
import { LoggedInUser } from '../store';
import { StoreHelper } from './store-helper';
import { LeaveType, Store } from '../store';
import { SelfServiceStore } from './selfservice.store';

export class ContentTypeProperty {
    name: string
    value: string
}

const dd: ContentTypeProperty[] = [{ name: '', value: '' }];

@Injectable()
export class SelfServiceService {
    constructor(private apiService: ApiService,
        private storeHelper: StoreHelper,
        private store: Store, private selfServiceStore: SelfServiceStore) {

    }

    get LoggedInUser(): LoggedInUser {
        return JSON.parse(window.localStorage.getItem('LoggedInUser'));
    }
    set LoggedInUser(loggedInUser: LoggedInUser) {
        window.localStorage.setItem('LoggedInUser', JSON.stringify(loggedInUser));
    }

    submitRequest(workflowTypeId: string, requestedBy: string, properties: ContentTypeProperty[]): Observable<any> {
        var submitInstance = { 'workflowTypeId': workflowTypeId, 'requestedBy': this.LoggedInUser.personID, 'Properties': properties }

        return this.apiService.post2("/people365MobileServices/api/Workflow/SubmitWorkflowInstance", submitInstance);
    }

    getAttendanceTypes(): Observable<any> {
        var x = `/people365MobileServices/api/Attendance/GetAttendanceTypes`;

        return this.apiService.getWindows(x)
            .do((res: any) => this.fillAttendanceTypes(res));
    }

    fillAttendanceTypes(res: any) {
        var leaveTypes: LeaveType[] = [];

        for (var i = 0; i < res.length; i++) {
            leaveTypes.push({ id: res[i].AttendanceTypeId, description: res[i].AttendanceTypeDescription });
        }

        //this.store.leaveTypesSubject.next(leaveTypes);
        this.store.leaveTypes = Observable.of(leaveTypes);
    }

    getEmployeeDayDuty(attendanceTypeId: String, dateFrom: String, dateTo: String): Observable<any> {
        var x = `/people365MobileServices/api/Attendance/GetEmployeeDayDuty?attendanceTypeId=${attendanceTypeId}&personId=${this.LoggedInUser.personID}&dateFrom=${dateFrom}&dateTo=${dateTo}`;

        return this.apiService.getWindows(x)
            //.do((res: any) =>
            //    this.store.employeeDayDuty = Observable.of(res))
            .do((res: any) => {
                this.selfServiceStore.employeeDayDuty = Observable.of(res);
                this.selfServiceStore.employeeDayDutySubject.next(res);
            });
    }

    getUserBalance(attendanceTypeId: String): Observable<any> {
        var x = `/people365MobileServices/api/Attendance/GetUserBalance?attendanceTypeId=${attendanceTypeId}&personId=${this.LoggedInUser.personID}`;
        x = encodeURI(x);

        return this.apiService.getWindows(x)
            //.do((res: any) =>
            //    this.store.userBalance = Observable.of(res.Balance))
            .do((res: any) => {
                this.selfServiceStore.userBalance = Observable.of(res.Balance);
                this.selfServiceStore.userBalanceSubject.next(res.Balance);
            }
            );
    }

    getSiteMap() {
        var x = `/people365MobileServices/api/Foundation/GetSiteMap?userName=${this.LoggedInUser.userName}&selectedRole=${this.LoggedInUser.selectedRole}&personId=${this.LoggedInUser.personID}`;
        //var x = `/People365NewAPI/api/Foundation/GetSiteMap`;

        this.apiService.getWindows(x)
            .subscribe((res: any) =>
                //.do((res: any) =>
                this.setSiteMap(res));
    }

    setSiteMap(res: any) {
        this.store.siteMapSubject.next(res);
        this.store.siteMap = Observable.of(res);
    }
}