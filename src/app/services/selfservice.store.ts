import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class SelfServiceStore {
    userBalance: Observable<Number> = Observable.of(0);
    userBalanceSubject = new BehaviorSubject<number>(0);

    employeeDayDuty: Observable<Number> = Observable.of(0);
    employeeDayDutySubject = new BehaviorSubject<number>(0);

    workflowTasks = new BehaviorSubject<any[]>([]);

    workflowTasksChanges = this.workflowTasks.asObservable()
        .distinctUntilChanged();

    taskDetails = new BehaviorSubject<any>({});

    taskDetailsChanges = this.taskDetails.asObservable()
        .distinctUntilChanged();
}