import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainContainer } from './main';
import { Auth } from './auth';
import { AuthService } from './services';
import { PageNotFoundComponent } from './shared/pagenotfound.component';

export const routes: Routes = [
    { path: '', redirectTo: 'main', canActivate: [AuthService], pathMatch: 'full' },
    { path: 'auth', component: Auth },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }