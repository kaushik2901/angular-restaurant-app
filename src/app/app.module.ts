import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DialogAlertComponent } from './app/components/dialog-alert/dialog-alert.component';
import { DialogConfirmComponent } from './app/components/dialog-confirm/dialog-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogAlertComponent,
    DialogConfirmComponent,
  ],
  imports: [
    // Core Utility Modules
    CommonModule,
    BrowserModule,
    FormsModule,

    // UI Related modules
    MatProgressBarModule,
    FlexLayoutModule,
    BrowserAnimationsModule,

    // Routing Modules
    AppRoutingModule,

    // NgRx Modules
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
