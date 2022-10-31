import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AnswerComponent } from '@qa/client/app/answer/components/answer/answer.component';
import { CreateAnswerComponent } from '@qa/client/app/answer/components/create-answer/create-answer.component';
import { EditAnswerComponent } from '@qa/client/app/answer/components/edit-answer/edit-answer.component';
import { RatingModule } from '@qa/client/app/modules/components/rating/rating.module';
import { SharedModule } from '@qa/client/app/shared/shared.module';

const COMPONENTS_TO_EXPORT = [
  AnswerComponent,
  CreateAnswerComponent,
  EditAnswerComponent,
];

const APP_MODULES = [
  RatingModule,
];


@NgModule({
  declarations: [
    ...COMPONENTS_TO_EXPORT,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ...APP_MODULES,
  ],
  exports: [
    ...COMPONENTS_TO_EXPORT,
  ],
})
export class AnswerModule { }
