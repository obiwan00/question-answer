import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '@qa/client/app/app-routing.module';

const MODULES_TO_EXPORT = [
  AppRoutingModule,
  ReactiveFormsModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...MODULES_TO_EXPORT],
  exports: [...MODULES_TO_EXPORT],
})
export class SharedModule { }
