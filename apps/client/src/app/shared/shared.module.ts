import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '@qa/client/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RatingComponent } from './components/rating/rating.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const MODULES_TO_EXPORT = [
  AppRoutingModule,
  ReactiveFormsModule,

  MatSnackBarModule,
];
const COMPONENTS_TO_EXPORT = [
  RatingComponent,
];

@NgModule({
  declarations: [...COMPONENTS_TO_EXPORT],
  imports: [CommonModule, ...MODULES_TO_EXPORT],
  exports: [...COMPONENTS_TO_EXPORT, ...MODULES_TO_EXPORT],
})
export class SharedModule { }
