import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { WorkflowService } from '../services';
import { Store }  from '../store';
import { StoreHelper, SelfServiceStore } from '../services';
import { LicenseManager } from 'ag-grid-enterprise/main';
import { ActivatedRoute, Router }    from '@angular/router';

@Component({
    selector: 'taskdetails',
    templateUrl: 'taskdetails.component.html',
    styles: [`
                td.container > div { width: 100%; height: 100%; overflow:hidden; }
                td.container { height: 50px; }
            `],
})
export class TaskDetailsComponent implements OnInit, OnDestroy {
    instance: any;
    taskId: string;

    constructor(private workflowService: WorkflowService,
        private route: ActivatedRoute,
        private router: Router,
        private selfServiceStore: SelfServiceStore,
        private storeHelper: StoreHelper) {

        this.selfServiceStore.taskDetailsChanges.subscribe(instance => {
            this.instance = instance;
        });
    }

    ngOnInit() {
        this.taskId = this.route.snapshot.params["taskid"];
        let instanceId = this.route.snapshot.params["instanceid"];

        this.workflowService.getRequestDetails(instanceId, this.taskId);
    }

    approveRequest() {
        let nodes: any[] = this.getTask(true);
        this.workflowService.approveRequests(nodes).subscribe();

        this.router.navigate(['main/selfservice', 'tasklist', { id: this.taskId }]);
    }

    rejectRequest() {
        let nodes: any[] = this.getTask(false);
        this.workflowService.approveRequests(nodes).subscribe();

        this.router.navigate(['main/selfservice', 'tasklist', { id: this.taskId }]);
    }

    getTask(isApproved: boolean) {
        let tasks: any[] = [];

        let task = { 'TaskId': this.taskId, 'IsApproved': isApproved, 'InstanceId': this.instance.InstanceId, 'PersonId': this.instance.PersonId };
        tasks.push(task);

        return tasks;
    }

    ngOnDestroy() {
        this.selfServiceStore.taskDetails.next({});
    }
}