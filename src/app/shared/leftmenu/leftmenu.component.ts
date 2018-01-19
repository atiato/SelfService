import { Component, AfterViewInit, OnInit, OnDestroy, ElementRef, DoCheck } from '@angular/core';
import { SelfServiceService, SelfServiceStore } from '../../services';
import { SiteMap, Store } from '../../store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import '../../../assets2/js/neon-custom.js';
declare var buildLeftMenu: any;

declare var jQuery: any;

@Component({
    selector: 'leftmenu',
    template: `
    <div class="sidebar-menu-inner">

                    <header class="logo-env">
                        <!-- logo -->
                        <div class="logo">
                            <a (click)="router.navigate(['main', 'landing']);">
                                <img src="assets2/images/People365.png" width="50" alt="" />
                            </a>
                            <span style="font-size: large; color:#949494">People365</span>
                        </div>
                        <!-- logo collapse icon -->
                        <div class="sidebar-collapse">
                            <a href="#" class="sidebar-collapse-icon">
                                <!-- add class "with-animation" if you want sidebar to have animation during expanding/collapsing transition -->
                                <i class="entypo-menu"></i>
                            </a>
                        </div>

                        <!-- open/close menu icon (do not remove if you want to enable menu on mobile devices) -->
                        <div class="sidebar-mobile-menu visible-xs">
                            <a href="#" class="with-animation">
                                <!-- add class "with-animation" to support animation -->
                                <i class="entypo-menu"></i>
                            </a>
                        </div>
                    </header>
                    <div *ngIf="siteMap.length == 0">Loading Menu...</div>
                    <ul id="main-menu" class="main-menu">
                        <li *ngFor="let menu of siteMap" [class]="getClass(menu)">
                            <a href="#">
                                <i [class]="getMenuClass(menu)"></i>
                                <span class="title">{{menu.Description}}</span>
                            </a>
                            <ul *ngIf="menu.InnerNodes" leftmenuitem [MenuItem]="menu.InnerNodes"></ul>
                        </li>
                    </ul>

                </div>
`
})
export class LeftMenuComponent implements OnInit, OnDestroy {
    //Menus = [{ 'Description': 'Menu 1', 'InnerNodes': [{ 'Description': 'Menu 4', InnerNodes: null }], { 'Description': 'Menu 5', 'InnerNodes': [{ 'Description': 'Menu 10', 'InnerNodes': [{ 'Description': 'Menu 12' }, { 'Description': 'Menu 13' }] }, { 'Description': 'Menu 11' }] }, { 'Description': 'Menu 6' }, { 'Description': 'Menu 7' }],{ 'Description': 'Menu 2', 'InnerNodes': [{ 'Description': 'Menu 6' }, { 'Description': 'Menu 7' }] }, { 'Description': 'Menu 3', 'InnerNodes': [{ 'Description': 'Menu 8', 'InnerNodes': [{ 'Description': 'Menu 12', 'InnerNodes': [{ 'Description': 'Menu 12' }, { 'Description': 'Menu 13', 'InnerNodes': [{ 'Description': 'Menu 12' }, { 'Description': 'Menu 13' }] }] }, { 'Description': 'Menu 13' }] }, { 'Description': 'Menu 9' }] }];

    getClass(menu) {
        if (menu.InnerNodes && menu.InnerNodes.length > 0) {
            return "has-sub";
        }
        else {
            return '';
        }
    }

    getMenuClass(menu) {
        let retVal = "";

        switch (menu.Description) {
            case "Time Attendance":
                retVal = "entypo-back-in-time"
                break;
            case "Security":
                retVal = "entypo-lock";
                break;
            case "Reports":
                retVal = "entypo-chart-bar";
                break;
            case "HR":
                retVal = "entypo-users";
                break;
            case "Foundation":
                retVal = "entypo-user-add";
                break;
            case "Payroll":
                retVal = "entypo-cc-nc";
                break;
            default:
                retVal = "entypo-map";
                break;
        }

        return retVal;
    }

    siteMap: SiteMap[];
    subscription: any;
    constructor(
        private router: Router,
        private selfServiceService: SelfServiceService,
        private store: Store,
        private elementRef: ElementRef) {

        this.subscription = this.store.siteMapSubject.subscribe(siteMap => {
            this.siteMap = siteMap;

            if (siteMap.length > 0) {
                setTimeout(function () {
                    //console.log('Site Map Built...');
                    buildLeftMenu();
                }, 500);
            }
        });
    }

    ngOnInit() {
        this.store.siteMapSubject.next([]);
        this.selfServiceService.getSiteMap();
    }

    ngOnDestroy() {
        this.store.siteMap = Observable.of([]);
        this.store.siteMapSubject.next([]);

        this.subscription.unsubscribe();
    }
}