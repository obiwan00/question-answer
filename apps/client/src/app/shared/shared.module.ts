import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '@qa/client/app/app-routing.module';
import { SpinnerComponent } from './components/spinner/spinner.component';

const MODULES_TO_EXPORT = [ReactiveFormsModule];
const COMPONENTS_TO_EXPORT = [SpinnerComponent];

@NgModule({
  declarations: [...COMPONENTS_TO_EXPORT],
  imports: [CommonModule, ...MODULES_TO_EXPORT],
  exports: [...MODULES_TO_EXPORT, ...COMPONENTS_TO_EXPORT],
})
export class SharedModule { }
