import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelfServiceService, ContentTypeProperty } from '../services';
import { NewService } from './newservice';

@Component({
    selector: 'loan-request',
    templateUrl: 'loanrequest.component.html'
})
export class LoanRequestComponent implements OnInit {
    constructor(private selfServiceService: SelfServiceService, private newService: NewService) {

    }

    employeeBalance: Number;
    ngOnInit() {
        this.employeeBalance = this.newService.getEmployeeBalance();
    }

    submitRequest() {
        var properties: ContentTypeProperty[] = [];
        properties.push({ name: 'Amount', value: '2000' });
        properties.push({ name: 'Currencty', value: '4440a738-405b-453e-9fea-ce868a3d7aa3' });
        properties.push({ name: 'IsAdvance', value: 'true' });

        this.selfServiceService.submitRequest("4FF68A29-35E8-4426-B979-741172FB87CC", "40053                               ", properties).subscribe();
    }
}