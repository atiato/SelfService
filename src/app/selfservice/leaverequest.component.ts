import { Component, OnInit, OnDestroy, DoCheck, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { SelfServiceService, ContentTypeProperty } from '../services';
import { Store, LeaveType } from '../store';
import { StoreHelper, SelfServiceStore } from '../services';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import 'rxjs/Rx';
import { LocaleService, Locale, LocalizationService } from 'angular2localization';

export class SuperClass extends Locale {
    constructor(public locale: LocaleService, public localization: LocalizationService) {
        super(locale, localization);

        this.localization.translationProvider('./resources/locale-');
        this.localization.updateTranslation();

        //Reflect.getMetadata('property', this);
    }
}

@Component({
    selector: 'leave-request',
    //changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'leaverequest.component.html'
})
export class LeaveRequestComponent extends SuperClass implements OnInit, OnDestroy, DoCheck {
    leaveSubmited: Boolean = false;

    leaveTypes: LeaveType[] = [];
    subscription: any;
    fromDate: string = '';
    toDate: string = '';
    leaveTypeId: string = "";
    userBalance: Number = 0;
    dayDuty: Number = 0;

    isBtnDisabled() {
        return true;
    }

    ngDoCheck() {
        console.log('do check');
    }

    constructor(private selfServiceService: SelfServiceService, private selfServiceStore: SelfServiceStore,
        private store: Store, public locale: LocaleService, public localization: LocalizationService) {
        super(locale, localization);

        this.selfServiceStore.userBalance = Observable.of(0);
        this.selfServiceStore.employeeDayDuty = Observable.of(0);

        this.selfServiceStore.userBalanceSubject.subscribe(x =>
            this.userBalance = x
        )

        this.selfServiceStore.employeeDayDutySubject.subscribe(x =>
            this.dayDuty = x
        )



        //this.selfServiceStore.userBalanceSubject.subscribe(
        //    x => this.userBalance = x
        //);

        //this.store.leaveTypes.subscribe(
        //    value => this.leaveTypes = value
        //);

        //this.store.leaveTypesSubject.subscribe(
        //    value => this.leaveTypes = value
        //);

        //this.localization.translationProvider('./resources/locale-');
        //this.localization.updateTranslation();
    }

    onLeaveTypeChange(leaveTypeId) {
        this.selfServiceService.getUserBalance(leaveTypeId).subscribe();
    }

    ngOnInit() {


        this.selfServiceService.getAttendanceTypes().subscribe();
    }

    onBlurMethod() {
        if (this.leaveTypeId && this.fromDate && this.toDate) {
            this.selfServiceService.getEmployeeDayDuty(this.leaveTypeId, this.fromDate, this.toDate).subscribe();
        }
    }

    ngOnDestroy() {

    }

    isButtonDisabled() {
        let isEnabled: Boolean = false;

        //isEnabled = this.leaveTypeId != '';

        isEnabled =
            this.dayDuty != 0 && this.dayDuty != undefined
            && this.fromDate != '' && this.toDate != '' && this.leaveTypeId != ''
            && this.userBalance != 0 && this.userBalance != undefined;

        return !isEnabled;

        //return false;
    }

    submitRequest() {
        var properties: ContentTypeProperty[] = [];
        properties.push({ name: 'DayDuty', value: this.dayDuty.toString() });
        properties.push({ name: 'FromDate', value: this.fromDate });
        properties.push({ name: 'ToDate', value: this.toDate });
        properties.push({ name: 'EquivalentHours', value: this.dayDuty.toString() });
        properties.push({ name: 'FullDay', value: '1' });
        properties.push({ name: 'Balance', value: this.userBalance.toString() });
        properties.push({ name: 'LeaveType', value: this.leaveTypeId });
        properties.push({ name: 'Remarks', value: '' });

        this.selfServiceService.submitRequest('848ECD54-BF0B-4400-B842-7CA11559C5D8', "40053                               ", properties).subscribe();

        this.leaveSubmited = !this.leaveSubmited;
    }
}

