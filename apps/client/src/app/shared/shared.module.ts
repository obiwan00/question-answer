import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '@qa/client/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

const MODULES_TO_EXPORT = [
  AppRoutingModule,
  ReactiveFormsModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MODULES_TO_EXPORT,
  ],
  exports: [
    ...MODULES_TO_EXPORT,
  ],
})
export class SharedModule { }
