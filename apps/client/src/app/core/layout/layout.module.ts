import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@qa/client/app/core/layout/components/header/header.component';
import { FooterComponent } from '@qa/client/app/core/layout/components/footer/footer.component';
import { SharedModule } from '@qa/client/app/shared/shared.module';
import { RouterModule } from '@angular/router';


const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    ...COMPONENTS,
  ],
})
export class LayoutModule { }
