import { Component, AfterViewInit } from '@angular/core';
declare var jQuery: any;

@Component({
    selector: 'menu2',
    template: `<nav class="navbar navbar-default">
                <div class="navbar-header">
                    <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>

                    <a class="navbar-brand">Project Name</a>
                </div>
                <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li *ngFor="let menu of Menus" class="dropdown">
                        <a tabindex="0" data-toggle="dropdown" data-submenu>
                        {{menu.desc}}<span class="caret"></span></a>
                        <ul class="dropdown-menu" menuitem2 [MenuItem]="menu.menus">
                        </ul>                            
                    </li>
                </ul>
                </div>`
})
export class Menu2Component implements AfterViewInit {
    Menus = [{ 'desc': 'Menu 1', 'menus': [{ 'desc': 'Menu 4' }, { 'desc': 'Menu 5', 'menus': [{ 'desc': 'Menu 10', 'menus': [{ 'desc': 'Menu 12' }, { 'desc': 'Menu 13' }] }, { 'desc': 'Menu 11' }] }, { 'desc': 'Menu 6' }, { 'desc': 'Menu 7' }] }, { 'desc': 'Menu 2', 'menus': [{ 'desc': 'Menu 6' }, { 'desc': 'Menu 7' }] }, { 'desc': 'Menu 3', 'menus': [{ 'desc': 'Menu 8', 'menus': [{ 'desc': 'Menu 12', 'menus': [{ 'desc': 'Menu 12' }, { 'desc': 'Menu 13', 'menus': [{ 'desc': 'Menu 12' }, { 'desc': 'Menu 13' }] }] }, { 'desc': 'Menu 13' }] }, { 'desc': 'Menu 9' }] }];

    getClass(menu) {
        if (menu.menus) {
            return "dropdown";
        }
    }

    ngAfterViewInit() {
        jQuery('[data-submenu]').submenupicker();
    }    
}