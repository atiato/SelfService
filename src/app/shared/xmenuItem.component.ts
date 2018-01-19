import { Component, Input, OnDestroy, OnInit, AfterViewInit } from '@angular/core';

@Component({
    selector: 'menuitem',
    template: `<li>
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">{{ MenuItem.desc }}<b class="caret"></b></a>
                <ul class="dropdown-menu">
                    <li *ngFor="let menu of MenuItem.menus">
                        <a *ngIf="!menu.menus" href="#">{{ menu.desc }}</a>
                        <menuitem *ngIf="menu.menus" [MenuItem]="menu"></menuitem>
                    </li>                    
                </ul></li>`
})
export class MenuItemComponent implements OnInit {
    @Input()
    MenuItem: any;

    constructor() {

    }

    ngOnInit() {
    }

    
}