import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AppRoutingModule } from '@qa/client/app/app-routing.module';
import { LoginComponent } from '@qa/client/app/core/auth/components/login/login.component';
import { RegistrationComponent } from '@qa/client/app/core/auth/components/registration/registration.component';
import { SharedModule } from '@qa/client/app/shared/shared.module';


const COMPONENTS = [
  RegistrationComponent,
  LoginComponent,
];

const MAT_MODULES = [
  MatProgressBarModule,
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
