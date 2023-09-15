import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminGuard } from './services/admin-guard.service';
import { UserPageComponent } from './pages/user-page/user-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent // login page main component
  },
  {
    path: 'admin',
    component: AdminPageComponent, // admin page component
    canActivate: [AdminGuard] // this route protected with AdminGuard
  },
  { path: 'user', 
  component: UserPageComponent, // user page component
  canActivate: [AdminGuard]
 },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
