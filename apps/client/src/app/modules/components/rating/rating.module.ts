import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from '@qa/client/app/modules/components/rating/rating.component';
import { SharedModule } from '@qa/client/app/shared/shared.module';


@NgModule({
  declarations: [RatingComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [RatingComponent],
})
export class RatingModule { }
