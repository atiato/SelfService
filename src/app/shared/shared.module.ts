import { NgModule, OnInit }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import {FormsModule, ReactiveFormsModule}         from '@angular/forms';

import { Navbar } from './navbar.component';
import { Navlist } from './navlist.component';
import { MainContent} from './maincontent.component';

import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';

import { LeftMenuComponent } from './leftmenu/leftmenu.component';
import { LeftMenuItemComponent } from './leftmenu/leftmenuitem.component';
import { ProfileInfoComponent } from './profileinfo.component';
import { LandingComponent } from './landing.component';

import { LocaleModule, LocalizationModule, LocaleService, LocalizationService } from 'angular2localization';
import { AgGridModule } from 'ag-grid-ng2/main';
import 'ag-grid-enterprise/main';

import { MaterialModule } from '@angular/material';
import { SidebarModule } from 'ng-sidebar';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, ButtonsModule, FormsModule, GridModule, LocaleModule, 
        LocalizationModule.forChild(), AgGridModule.withComponents([]), MaterialModule.forRoot(), SidebarModule],
    declarations: [Navbar, Navlist, MainContent, LeftMenuComponent, LeftMenuItemComponent, 
        ProfileInfoComponent, LandingComponent],
    exports: [CommonModule, FormsModule, Navbar, Navlist, MainContent,
        ButtonsModule, GridModule, LocaleModule, LocalizationModule, AgGridModule, ReactiveFormsModule,
        MaterialModule, SidebarModule, LeftMenuComponent, ProfileInfoComponent, LandingComponent]
})

export class SharedModule { }

export function timeout(milliseconds: number = 0) {
    return function (target, key, descriptor) {
        var originalMethod = descriptor.value;

        descriptor.value = function (...args) {
            setTimeout(() => {
                originalMethod.apply(this, args);
            }, milliseconds);
        };

        return descriptor;
    }
}