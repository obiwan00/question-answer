import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SearchBarComponent } from '@qa/client/app/modules/components/search-bar/search-bar.component';
import { SharedModule } from '@qa/client/app/shared/shared.module';


const MAT_MODULES = [
  MatButtonModule,
  MatIconModule,
];

@NgModule({
  declarations: [SearchBarComponent],
  imports: [
    CommonModule,
    SharedModule,
    ...MAT_MODULES,
  ],
  exports: [SearchBarComponent],
})
export class SearchBarModule { }
