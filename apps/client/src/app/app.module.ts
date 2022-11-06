import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutModule } from '@qa/client/app/about/about.module';
import { AppRoutingModule } from '@qa/client/app/app-routing.module';
import { ChatModule } from '@qa/client/app/chat/chat.module';
import { AuthInterceptor } from '@qa/client/app/core/auth/auth.interseptor';
import { AuthModule } from '@qa/client/app/core/auth/auth.module';
import { LayoutModule } from '@qa/client/app/core/layout/layout.module';
import { SharedModule } from '@qa/client/app/shared/shared.module';
import { TopicModule } from '@qa/client/app/topic/topic.module';
import { AppComponent } from './app.component';


const CORE_NG_MODULES = [
  BrowserModule,
  HttpClientModule,
  BrowserAnimationsModule,
  AppRoutingModule,
];


const APP_MODULES = [
  SharedModule,

  AuthModule,
  LayoutModule,
  AboutModule,
  TopicModule,
  ChatModule,
];

const HTTP_INTERCEPTORS_PROVIDERS = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
];


@NgModule({
  declarations: [AppComponent],
  imports: [
    ...CORE_NG_MODULES,
    ...APP_MODULES,
  ],
  providers: [
    ...HTTP_INTERCEPTORS_PROVIDERS,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
