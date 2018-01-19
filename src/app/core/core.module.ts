import {
    ModuleWithProviders,
    NgModule,
    Optional,
    SkipSelf }       from '@angular/core';
import { CommonModule }      from '@angular/common';
import { TitleComponent }    from './title.component';

@NgModule({
    imports: [CommonModule],
    declarations: [TitleComponent],
    exports: [TitleComponent]
})

export class CoreModule {
}