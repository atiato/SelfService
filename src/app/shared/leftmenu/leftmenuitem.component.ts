import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[leftmenuitem]',
    template: `<li *ngFor="let innerMenu of MenuItem" [class]="getClass(innerMenu)">
                   <a (click)="test()">
                       <span class="title">{{innerMenu.Description}}</span>
                   </a>
                   <ul *ngIf="innerMenu.InnerNodes" leftmenuitem [MenuItem]="innerMenu.InnerNodes"></ul>
               </li>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeftMenuItemComponent {
    @Input()
    MenuItem: any;

    constructor(private router: Router) {

    }

    getClass(innerMenu) {
        if (innerMenu.InnerNodes && innerMenu.InnerNodes.length > 0) {
            return "has-sub";
        }
        else
            return '';
    }

    test() {
        //this.router.navigate(['main', 'selfservice']);
    }
}