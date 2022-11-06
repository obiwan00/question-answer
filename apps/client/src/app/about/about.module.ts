import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@qa/client/app/shared/shared.module';
import { AboutComponent } from '@qa/client/app/about/about.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AboutComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
  ],
})
export class AboutModule { }
