import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from '@qa/client/app/core/layout/components/footer/footer.component';
import { HeaderComponent } from '@qa/client/app/core/layout/components/header/header.component';
import { SharedModule } from '@qa/client/app/shared/shared.module';


const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
];

const MAT_MODULES = [
  MatButtonModule,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ...MAT_MODULES,
  ],
  exports: [
    ...COMPONENTS,
  ],
})
export class LayoutModule { }
