import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ShellComponent } from './shell/shell.component';
import { FoodItemComponent } from './food-item/food-item.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { MyProfileComponent } from './my-profile/my-profile.component';


const routes: Routes = [
  { 
    path: '',
    component: ShellComponent,
    children: [
      { path: '', pathMatch: 'full', component: HomeComponent },
      { path: 'food/:id', component: FoodItemComponent },
      { path: 'food/update/:id', component: FoodItemComponent, data: { update: true } },
      { path: 'my-cart', component: MyCartComponent },
      { path: 'my-orders', component: MyOrdersComponent },
      { path: 'logout', component: MyProfileComponent },
    ]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
