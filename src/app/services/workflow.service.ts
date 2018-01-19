import { Injectable } from '@angular/core';
import { ApiService } from './api';
import { Observable } from 'rxjs/Observable';
import { ServiceBase } from './servicebase';
import { SelfServiceStore } from './selfservice.store';

@Injectable()
export class WorkflowService extends ServiceBase {
    constructor(
        private apiService: ApiService,
        private selfServiceStore: SelfServiceStore) {
        super();
    }

    getPendingTasks() {
        var url = `/api/Foundation/GetWorkflowTask/${this.CurrentLoggedInUser.personID}/${this.CurrentLoggedInUser.userID}`;

        this.apiService.getLinux(url).subscribe(res => {
            this.selfServiceStore.workflowTasks.next(res);
        });

    }

    getRequestDetails(instanceId: string, taskId: string) {
        var url = `/api/Foundation/GetRequestDetails/${instanceId}/${taskId}`;
        //var url = `/people365MobileServices/api/Workflow/GetRequestDetails?instanceId=${instanceId}&taskId=${taskId}`;

        this.apiService.getLinux(url).subscribe(instance => {
            this.selfServiceStore.taskDetails.next(instance);
        });
    }

    approveRequests(requests: any[]) {
        var url = `/people365MobileServices/api/Workflow/CompleteTasks`;
        return this.apiService.post2(url, requests);
    }
}