import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ShellComponent } from './shell/shell.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/index';
import { EffectsModule } from '@ngrx/effects';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FlexModule, FlexLayoutModule } from '@angular/flex-layout';
import { FoodItemComponent } from './food-item/food-item.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UserEffects } from './store/user/user.effect';

@NgModule({
  declarations: [HomeComponent, MyOrdersComponent, ShellComponent, FoodItemComponent, MyCartComponent, MyProfileComponent, ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SharedModule,

    FlexLayoutModule,
    FlexModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule,
    MatButtonModule,
    MatInputModule,
    MatOptionModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDividerModule,

    StoreModule.forFeature('user', userReducer.reducer),
    EffectsModule.forFeature([ UserEffects, ]),
  ]
})
export class UserModule { }
