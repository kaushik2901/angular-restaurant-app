import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FoodTileUiComponent } from './food-tile-ui/food-tile-ui.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { foodReducer } from './store';
import { EffectsModule } from '@ngrx/effects';
import { FoodsEffects } from './store/foods/foods.effects';
import { MyCartTileUiComponent } from './my-cart-tile-ui/my-cart-tile-ui.component';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [NavbarComponent, FoodTileUiComponent, MyCartTileUiComponent,],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,

    StoreModule.forFeature('food', foodReducer.reducer),
    EffectsModule.forFeature([ FoodsEffects ]),
  ],
  exports: [
    NavbarComponent,
    FoodTileUiComponent,
    MyCartTileUiComponent
  ]
})
export class SharedModule { }
