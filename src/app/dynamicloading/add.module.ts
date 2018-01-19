import { NgModule }             from '@angular/core';
import { AppComponent }         from './adapp.component';
import { HeroJobAdComponent }   from './hero-job-ad.component';
import { AdBannerComponent }    from './ad-banner.component';
import { HeroProfileComponent } from './hero-profile.component';
import { AdDirective }          from './ad.directive';
import { AdService }            from './ad.service';
import { DynamicLoadingRoutingModule } from './dynamicloading-routing';

@NgModule({
    imports: [ DynamicLoadingRoutingModule],
    providers: [AdService],
    declarations: [AppComponent,
        AdBannerComponent,
        HeroJobAdComponent,
        HeroProfileComponent,
        AdDirective],
    entryComponents: [HeroJobAdComponent, HeroProfileComponent],
    bootstrap: [AppComponent]
})
export class AdAppModule {
    constructor() { }
}
