import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './adapp.component';

const routes: Routes = [
    { path: 'dynamic', component: AppComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DynamicLoadingRoutingModule { }