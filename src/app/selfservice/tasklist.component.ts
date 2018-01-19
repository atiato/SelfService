import { Input, Component, OnInit, OnDestroy, AfterViewChecked, DoCheck, ChangeDetectionStrategy } from '@angular/core';
import { WorkflowService } from '../services';
import { Store } from '../store';
import { StoreHelper, SelfServiceStore } from '../services';
import { LicenseManager } from 'ag-grid-enterprise/main';
import { RowNode } from 'ag-grid/main';
import { Router, ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'task-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [`
            .verticalLine {
              border-left: thick solid #ff0000;
            }`
    ],
    template: `<div style="padding-bottom: 3px;" class="col-lg-12">
<div class="col-12" style=" border: 1px solid grey; background-color: #EEEEEE; width: 100%; text-align: left;" role="group" aria-label="Basic example">  
      
             <button class="btn btn-outline-success col-4" type="button" 
                    style="color:green; margin: 5px;background-color: white;" (click)="approveRequests()" [disabled]="isButtonDisabled()">
                <span class="glyphicon glyphicon-ok-sign"> </span> Approve
            </button>
            <button class="btn btn-outline-success col-4 " type="button" 
                    style="color:red; margin: 5px;background-color: white;" (click)="rejectRequests()" [disabled]="isButtonDisabled()">
                <span class="glyphicon glyphicon-remove-sign"> </span> Reject
            </button>
            <button class="btn btn-outline-success col-4" type="button" 
                style="color:#5196d4; margin: 5px;background-color: white;"  (click)="onSubmitNewRequest()">  
                <span class="glyphicon glyphicon-plus-sign"></span> Submit Leave Request 
            </button>      
</div> 
</div>
        <nav class="navbar navbar-light bg-faded" style="display: none;">
          <form class="form-inline">
            <button class="btn btn-outline-success" type="button" style="width: 100px" (click)="approveRequests()" [disabled]="isButtonDisabled()">Approve</button>
            <button class="btn btn-outline-success" type="button" style="width: 100px" (click)="rejectRequests()" [disabled]="isButtonDisabled()">Reject</button>
          </form>
        </nav>

        <ag-grid-ng2 #agGrid style=" height: 650px;" class="ag-fresh col-lg-12"
            [gridOptions]="gridOptions" rowSelection="multiple"
            (rowSelected)="onRowSelected()" (rowClicked)="onRowClicked($event)" paginationInitialRowCount="10" 
            suppressRowClickSelection="true">
        </ag-grid-ng2>`
})
export class TaskListComponent implements OnInit, OnDestroy, DoCheck {
    subscription: any;
    btnDisabled: boolean;
    rowData: any;

    constructor(private workflowService: WorkflowService,
        private route: ActivatedRoute,
        private router: Router,
        public snackBar: MdSnackBar,
        private selfServiceStore: SelfServiceStore,
        private storeHelper: StoreHelper) {

        this.subscription = this.selfServiceStore.workflowTasksChanges.subscribe(tasks => {
            if (tasks) {
                if (this.gridOptions && this.gridOptions.api) {

                    this.route.params
                        .map(params => params['id'])
                        .subscribe((id) => {
                            let selectedTask: any;
                            for (var i = 0, len = tasks.length; i < len; i++) {
                                if (tasks[i].TaskId == id) {
                                    selectedTask = tasks[i];
                                    break;
                                }
                            }

                            if (selectedTask) {
                                let index: number = tasks.indexOf(selectedTask);
                                tasks.splice(index, 1);
                            }
                        });

                    this.gridOptions.api.setRowData(tasks);
                }
                //else {
                //this.rowData = tasks;
                //console.log('tasks filled...');
                //setTimeout('this.gridOptions.api.setRowData(tasks);', 1000);
                //}
            }
        });
    }

    openSnackBar() {
        this.snackBar.open('Task(s) approved.', '', {
            duration: 2000
        });

        //this.snackBar.openFromComponent(PizzaPartyComponent, {
        //    duration: 500,
        //});
    }

    taskId: string;
    ngOnInit() {
        LicenseManager.setLicenseKey('ag-Grid_EvaluationLicense_100Devs27_January_2018__MTUxNzAxMTIwMDAwMA==8c9dff17620c1f17c7c34cb69061acb6');

        //if (this.store.workflowTasks.getValue() == [] || this.store.workflowTasks.getValue().length == 0) {

        this.workflowService.getPendingTasks();
        //.subscribe(tasks => {
        //    this.gridOptions.api.setRowData(tasks);
        //});
        //}
    }

    onSubmitNewRequest() {
        this.router.navigate(['main/selfservice/', 'leaverequest']);
    }

    ngDoCheck() {
        console.log('Change detector run...');
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        //this.storeHelper.update('tasks', []);
    }

    columnDefs = [
        { checkboxSelection: true, headerCheckboxSelection: true, width: 30, maxWidth: 30 },
        { headerName: 'Leave Type', field: 'LeaveType', filterParams: { newRowsAction: 'keep' } },
        { headerName: 'Person Name', field: 'PersonName', filterParams: { newRowsAction: 'keep' } },
        { headerName: 'Job', field: 'PersonJob', filterParams: { newRowsAction: 'keep' } },
        {
            headerName: 'From Date', filter: 'date',
            valueGetter: this.computeFromDate,
            comparator: this.dateComparator,
            filterParams: {
                newRowsAction: 'keep',
                apply: true,
                comparator: function (filterLocalDateAtMidnight, cellValue) {
                    var dateAsString = cellValue;
                    var dateParts = dateAsString.split("/");
                    var cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));

                    if (filterLocalDateAtMidnight.getTime() == cellDate.getTime()) {
                        return 0
                    }

                    if (cellDate < filterLocalDateAtMidnight) {
                        return -1;
                    }

                    if (cellDate > filterLocalDateAtMidnight) {
                        return 1;
                    }
                }
            }
        },
        { headerName: 'To Date', valueGetter: this.computeToDate, comparator: this.dateComparator, filterParams: { newRowsAction: 'keep' } },
        { headerName: 'Status', field: 'TaskStatusDisplay', filterParams: { newRowsAction: 'keep' } }
    ];

    dateComparator(date1, date2) {
        function monthToComparableNumber(date) {
            if (date === undefined || date === null || date.length !== 10) {
                return null;
            }

            var yearNumber = date.substring(6, 10);
            var monthNumber = date.substring(3, 5);
            var dayNumber = date.substring(0, 2);

            var result = (yearNumber * 10000) + (monthNumber * 100) + dayNumber;
            return result;
        }

        var date1Number = monthToComparableNumber(date1);
        var date2Number = monthToComparableNumber(date2);

        if (date1Number === null && date2Number === null) {
            return 0;
        }
        if (date1Number === null) {
            return -1;
        }
        if (date2Number === null) {
            return 1;
        }

        return date1Number - date2Number;
    }

    gridOptions = {
        columnDefs: this.columnDefs,
        rowData: null,
        api: null,
        enableSorting: true,
        rowHeight: 32,
        headerHeight: 32,
        enableFilter: true//,
        //paginationPageSize: 10,
        //animateRows: true//,
        //rowModelType: 'pagination'
        //enableServerSideSorting: true,
        //enableServerSideFilter: true
    };

    computeFromDate(params) {
        function convertDate(inputFormat) {
            function pad(s) {
                return (s < 10) ? '0' + s : s;
            }
            var d = new Date(inputFormat);
            return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
        }

        let fromDate = params.data.FromDate;
        return convertDate(fromDate);
    }

    computeToDate(params) {
        function convertDate(inputFormat) {
            function pad(s) {
                return (s < 10) ? '0' + s : s;
            }
            var d = new Date(inputFormat);
            return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
        }

        let fromDate = params.data.ToDate;
        return convertDate(fromDate);
    }

    //dataSource = {
    //    //paginationPageSize: 10,
    //    //overflowSize: 10,

    //    getRows: (params: any) => {
    //        //var filter = '';
    //        //if (params.filterModel && params.filterModel.Name && params.filterModel.Name.filter) {
    //        //    filter = params.filterModel.Name.filter;
    //        //}

    //        this.workflowService.getPendingTasks().subscribe(data => {
    //            params.successCallback(data);
    //        });
    //    }
    //}

    onRowSelected() {

    }

    onRowClicked(event: any) {
        let taskId = event.data.TaskId;
        let instanceId = event.data.InstanceId;

        this.router.navigate(['main/selfservice', 'taskdetails', taskId, instanceId]);
    }

    index: number = 0;
    isButtonDisabled() {
        this.index++;
        console.log(`${this.index}. Is button disabled`);

        if (this.gridOptions && this.gridOptions.api) {
            this.btnDisabled = false;
            return !(this.gridOptions.api.getSelectedNodes().length > 0);
        }
        else {
            this.btnDisabled = true;
            return true;
        }
    }

    approveRequests() {
        let nodes: any[] = this.getSelectedTasks(true);
        this.workflowService.approveRequests(nodes).subscribe();
    }

    rejectRequests() {
        let nodes: any[] = this.getSelectedTasks(false);
        this.workflowService.approveRequests(nodes).subscribe();
    }

    getSelectedTasks(isApproved: boolean) {
        let selectedNodes: RowNode[] = this.gridOptions.api.getSelectedNodes();

        //this.store.workflowTasks
        this.gridOptions.api.removeItems(selectedNodes);

        //this.openSnackBar();

        let tasks: any[] = [];

        for (let i = 0; i < selectedNodes.length; i++) {
            let data = selectedNodes[i].data;

            let task = { 'TaskId': data.TaskId, 'IsApproved': isApproved, 'InstanceId': data.InstanceId, 'PersonId': data.PersonId };

            tasks.push(task);
        }

        return tasks;
    }
}
