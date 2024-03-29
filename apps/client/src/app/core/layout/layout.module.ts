import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '@qa/client/app/app-routing.module';
import { FooterComponent } from '@qa/client/app/core/layout/components/footer/footer.component';
import { HeaderComponent } from '@qa/client/app/core/layout/components/header/header.component';
import { SharedModule } from '@qa/client/app/shared/shared.module';


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
    AppRoutingModule,
    SharedModule,
  ],
  exports: [
    ...COMPONENTS,
  ],
})
export class LayoutModule { }
