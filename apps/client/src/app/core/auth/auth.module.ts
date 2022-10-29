import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoginComponent } from '@qa/client/app/core/auth/components/login/login.component';
import { RegistrationComponent } from '@qa/client/app/core/auth/components/registration/registration.component';
import { SharedModule } from '@qa/client/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from '@qa/client/app/app-routing.module';


const COMPONENTS = [
  RegistrationComponent,
  LoginComponent,
];

const MAT_MODULES = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatIconModule,
  MatProgressBarModule,
  MatSnackBarModule,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    ...MAT_MODULES,
  ],
})
export class AuthModule { }
