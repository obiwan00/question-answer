import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SpinnerComponent } from './components/spinner/spinner.component';

const MODULES_TO_EXPORT = [ReactiveFormsModule];
const COMPONENTS_TO_EXPORT = [SpinnerComponent];
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
  declarations: [...COMPONENTS_TO_EXPORT],
  imports: [
    CommonModule,
    ...MODULES_TO_EXPORT,
    ...MAT_MODULES,
  ],
  exports: [
    ...MODULES_TO_EXPORT,
    ...COMPONENTS_TO_EXPORT,
    ...MAT_MODULES,
  ],
})
export class SharedModule { }
