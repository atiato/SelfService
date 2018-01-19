import { NgModule, APP_INITIALIZER, ModuleWithProviders, Injectable} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CommonModule }        from '@angular/common';
import { HttpModule } from '@angular/http'
import { PageNotFoundComponent } from './app/shared/pagenotfound.component';

import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app';
import { SharedModule } from './app/shared';
import { providers } from './app';
import { Auth } from './app/auth';
import { MainModule } from './app/main';
import { NgRedux, NgReduxModule, DevToolsExtension } from 'ng2-redux';

import { User, IAppState, INITIAL_STATE, rootReducer } from './app/store';

import { LocaleModule, LocalizationModule, LocaleService, LocalizationService } from 'angular2localization';
import 'hammerjs';

@Injectable()
export class LocalizationConfig {
    constructor(public locale: LocaleService, public localization: LocalizationService) { }

    load(): Promise<any> {

        // Adds the languages (ISO 639 two-letter or three-letter code).
        this.locale.addLanguages(['en', 'it', 'ar']);

        // Required: default language, country (ISO 3166 two-letter, uppercase code) and expiry (No days). If the expiry is omitted, the cookie becomes a session cookie.
        this.locale.definePreferredLocale('en', 'US', 30);

        // Optional: default currency (ISO 4217 three-letter code).
        this.locale.definePreferredCurrency('USD');

        // Initializes LocalizationService: asynchronous loading.
        this.localization.translationProvider('./resources/locale-'); // Required: initializes the translation provider with the given path prefix.

        var promise: Promise<any> = new Promise((resolve: any) => {
            this.localization.translationChanged.subscribe(() => {
                resolve(true);
            });
        });

        this.localization.updateTranslation(); // Need to update the translation.

        return promise;
    }
}

export function initLocalization(localizationConfig: LocalizationConfig): Function {
    return () => localizationConfig.load();
}

@NgModule({
    declarations: [AppComponent, Auth, PageNotFoundComponent],
    imports: [BrowserModule, SharedModule, HttpModule, MainModule, AppRoutingModule, NgReduxModule,
        LocaleModule.forRoot(), LocalizationModule.forRoot()],
    providers: [providers,
        LocalizationConfig,
        {
            provide: APP_INITIALIZER, // APP_INITIALIZER will execute the function when the app is initialized and delay what it provides.
            useFactory: initLocalization,
            deps: [LocalizationConfig],
            multi: true
        }
    ],
    //providers: [Store, SelfServiceStore, AuthService, ApiService, StoreHelper, SelfServiceService],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(ngRedux: NgRedux<IAppState>) {
        ngRedux.configureStore(rootReducer, INITIAL_STATE);
    }
}

platformBrowserDynamic().bootstrapModule(AppModule);

