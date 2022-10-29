import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RatingModule } from '@qa/client/app/modules/components/rating/rating.module';
import { SearchBarModule } from '@qa/client/app/modules/components/search-bar/search-bar.module';
import { SharedModule } from '@qa/client/app/shared/shared.module';
import { TopicComponent } from './components/topic/topic.component';
import { TopicsFeedComponent } from './components/topics-feed/topics-feed.component';
import { TopicRoutingModule } from './topic-routing.module';

const COMPONENTS = [
  TopicsFeedComponent,
  TopicComponent,
];

const MAT_MODULES = [
  MatButtonModule,
  // MatFormFieldModule,
  // MatInputModule,
  MatCardModule,
  // MatIconModule,
  // MatProgressBarModule,
];

const APP_MODULES = [
  RatingModule,
  SearchBarModule,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    TopicRoutingModule,
    SharedModule,
    ...MAT_MODULES,
    ...APP_MODULES,
  ],
  exports: [...COMPONENTS],
})
export class TopicModule { }
