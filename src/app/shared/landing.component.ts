import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'landingcomponent',
    //templateUrl: 'landing.component.html'
    template: `Welcome to People365 Self Service`
})
export class LandingComponent {
    constructor(private router: Router) {

    }
}