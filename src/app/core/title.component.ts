import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-title',
    template: `<h1 highlight>{{title}} {{subtitle}}</h1>
                <p *ngIf="user">
                  <i>Welcome, {{user}}</i>
                <p>`,
})
export class TitleComponent {
    @Input() subtitle = '';
    title = 'Angular Modules';
    user = '';

    constructor() {
        this.user = 'Hello';
    }
}
