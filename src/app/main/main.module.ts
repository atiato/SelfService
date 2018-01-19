import { NgModule }            from '@angular/core';

import { MainRoutingModule } from './main-routing.module';
import { MainContainer } from './main.component';
import { SharedModule } from '../shared';

import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';

@NgModule({
    imports: [MainRoutingModule, SharedModule, ButtonsModule, GridModule],
    declarations: [MainContainer],
    exports: [MainContainer]
})
export class MainModule { }
