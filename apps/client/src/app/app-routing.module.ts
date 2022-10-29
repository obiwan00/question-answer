import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '@qa/client/app/about/about.component';
import { authRoutes } from '@qa/client/app/core/auth/auth-routing.module';
import { topicRoutes } from '@qa/client/app/topic/topic-routing.module';

const routes: Routes = [
  { path: '', redirectTo: 'topics', pathMatch: 'full' },
  { path: 'auth', children: authRoutes },
  { path: 'about', component: AboutComponent },
  { path: 'topics', children: topicRoutes },
  { path: '**', redirectTo: 'topics' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
