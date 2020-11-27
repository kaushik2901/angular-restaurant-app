// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

// NgRx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Routing
import { AuthenticationRoutingModule } from './authentication-routing.module';

// Store
import { reducer, AuthenticationEffects } from './store';

// Services
import { AuthenticationGuardService } from './authentication-guard.service';
import { AuthenticationApiService } from './authentication-api.service';

// Components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LoginFormComponent,
    RegistrationFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,

    // UI Modules
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDividerModule,

    AuthenticationRoutingModule,
    StoreModule.forFeature('authentication', reducer),
    EffectsModule.forFeature([AuthenticationEffects]),
  ],
  providers: [
    AuthenticationGuardService,
    AuthenticationApiService,
  ]
})
export class AuthenticationModule { }
