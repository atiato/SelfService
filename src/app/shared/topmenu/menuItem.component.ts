import { Component, Input, OnDestroy, OnInit, AfterViewInit } from '@angular/core';

@Component({
    selector: 'menuitem',
    template: `<a href="#">{{ MenuItem.desc }}</a>
                <ul class="sub-menu">
                    <li *ngFor="let menu of MenuItem.menus" [class]="getClass(menu)">
                        <a *ngIf="!menu.menus" href="#">{{ menu.desc }}</a>
                        <menuitem *ngIf="menu.menus" [MenuItem]="menu"></menuitem>
                    </li>                    
                </ul>`
})
export class MenuItemComponent implements OnInit {
    @Input()
    MenuItem: any;

    constructor() {

    }

    getClass(menu) {
        if (menu.menus) {
            return "dropdown";
        }
    }

    ngOnInit() {
    }
}