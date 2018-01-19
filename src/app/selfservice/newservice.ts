import { Observable} from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class NewService {
    constructor() {

    }

    employeeBalance: Number;

    getEmployeeBalance(): Number {
        return 11;
    }
}
