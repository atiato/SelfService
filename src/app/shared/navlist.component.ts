import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'navlist',
    templateUrl: 'navlist.component.html',
    styles: [`.example-container {
                  width: 500px;
                  height: 300px;
                  border: 1px solid rgba(0, 0, 0, 0.5);
                }

                .example-sidenav-content {
                  display: flex;
                  height: 100%;
                  align-items: center;
                  justify-content: center;
                }

                .example-sidenav {
                  padding: 20px;
                }`]
})
export class Navlist {
    constructor(private router: Router) { }

    test() {
        this.router.navigate(['main', 'tasklist']);
    }

    private _opened: boolean = false;

    private _toggleSidebar() {
        this._opened = !this._opened;
    }
}