import { Component, OnInit } from '@angular/core';
import { AuthService } from './services';
import { Locale, LocaleService, LocalizationService } from 'angular2localization';

@Component({
    selector: 'my-app',
    template: `<div style="width:100%; height:100%;">
                   <router-outlet></router-outlet>
               </div>`,
})
export class AppComponent extends Locale implements OnInit {
    subtitle = '(v1)';

    constructor(public locale: LocaleService, public localization: LocalizationService, private authService: AuthService) {
        super(null, localization);
    }

    ngOnInit() {
        //this.authService.testAjax().subscribe();
        //this.authService.authenticate('grant_type=password&username=40053/People365/sets&password=GigiZbSt!!&client_id=People365App').subscribe();

        //this.locale.setCurrentLocale('en', 'US');
        //this.locale.setCurrentCurrency('USD');
    }

    selectLocale(language: string, country: string, currency: string): void {
        this.locale.setCurrentLocale(language, country);
        this.locale.setCurrentCurrency(currency);
    }
}

