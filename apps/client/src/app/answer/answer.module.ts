import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AnswerComponent } from '@qa/client/app/answer/components/answer/answer.component';
import { RatingModule } from '@qa/client/app/modules/components/rating/rating.module';
import { SharedModule } from '@qa/client/app/shared/shared.module';

const COMPONENTS_TO_EXPORT = [
  AnswerComponent,
];

const APP_MODULES = [
  RatingModule,
];
const MAT_MODULES = [
  MatCardModule,
  MatButtonModule,
];

@NgModule({
  declarations: [
    ...COMPONENTS_TO_EXPORT,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ...APP_MODULES,
    ...MAT_MODULES,
  ],
  exports: [
    ...COMPONENTS_TO_EXPORT,
  ],
})
export class AnswerModule { }
