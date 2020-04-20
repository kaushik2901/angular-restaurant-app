import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { PageNotFoundComponent } from './containers/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  { path: 'auth', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule), },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule), },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), },
  { path: 'staff', loadChildren: () => import('./staff/staff.module').then(m => m.StaffModule), },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
