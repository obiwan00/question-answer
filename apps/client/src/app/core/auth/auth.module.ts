import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegistrationComponent } from '@qa/client/app/core/auth/components/registration/registration.component';
import { LoginComponent } from '@qa/client/app/core/auth/components/login/login.component';

const COMPONENTS = [
  RegistrationComponent,
  LoginComponent,
];


@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
  ],
})
export class AuthModule { }
