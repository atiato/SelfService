//import * as services from './services';

import { AuthService } from './services';
import { StoreHelper } from './services';
import { ApiService } from './services';
import { SelfServiceService, ContentTypeProperty } from './services';
import { SelfServiceStore } from './services';
import { NewService, WorkflowService } from './services';

import { Store } from './store';
export { AppRoutingModule } from './app-routing.module';

//export const mapValuesToArray = (obj) => Object.keys(obj).map(key => obj[key]);

export const providers = [
    Store, AuthService, StoreHelper, ApiService, SelfServiceService, ContentTypeProperty, SelfServiceStore, NewService,
    WorkflowService
    //...mapValuesToArray(services)
]

