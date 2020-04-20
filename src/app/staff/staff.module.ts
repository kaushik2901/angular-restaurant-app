import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { ShellComponent } from './shell/shell.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ShellComponent, HomeComponent],
  imports: [
    CommonModule,
    StaffRoutingModule,
    SharedModule,
  ]
})
export class StaffModule { }
