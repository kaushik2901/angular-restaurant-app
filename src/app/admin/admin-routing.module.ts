import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from './shell/shell.component';
import { HomeComponent } from './home/home.component';
import { FoodEditComponent } from './food-edit/food-edit.component';


const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: '', pathMatch: 'full', component: HomeComponent },
      { path: 'edit/food/:id', pathMatch: 'full', component: FoodEditComponent },
      { path: 'edit/food', pathMatch: 'full', component: FoodEditComponent },
    ]
  },
  { path: '**', redirectTo: 'admin' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
