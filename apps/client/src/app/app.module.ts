import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutModule } from '@qa/client/app/about/about.module';
import { AppRoutingModule } from '@qa/client/app/app-routing.module';
import { AuthModule } from '@qa/client/app/core/auth/auth.module';
import { LayoutModule } from '@qa/client/app/core/layout/layout.module';
import { SharedModule } from '@qa/client/app/shared/shared.module';
import { TopicModule } from '@qa/client/app/topic/topic.module';
import { AppComponent } from './app.component';


const CORE_NG_MODULES = [
  BrowserModule,
  HttpClientModule,
  BrowserAnimationsModule,
];

const APP_MODULES = [
  AppRoutingModule,
  SharedModule,

  AuthModule,
  LayoutModule,
  TopicModule,
  AboutModule,
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    ...CORE_NG_MODULES,
    ...APP_MODULES,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
