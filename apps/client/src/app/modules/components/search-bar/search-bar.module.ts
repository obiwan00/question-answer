import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchBarComponent } from '@qa/client/app/modules/components/search-bar/search-bar.component';
import { SharedModule } from '@qa/client/app/shared/shared.module';


@NgModule({
  declarations: [SearchBarComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [SearchBarComponent],
})
export class SearchBarModule { }
