import { Component, Input } from '@angular/core';

@Component({
    selector: '[menuitem2]',
    template: `<li *ngFor="let menu of MenuItem" [class]="getClass(menu)">
                    <a tabindex="0">{{ menu.desc }}</a>
                    <ul class="dropdown-menu" menuitem2 *ngIf="menu.menus" [MenuItem]="menu.menus">
                    </ul> 
                </li>`
})
export class MenuItem2Component {
    @Input()
    MenuItem: any;

    getClass(menu) {
        if (menu.menus) {
            return "dropdown-submenu";
        }
        else
            return '';
    }
}