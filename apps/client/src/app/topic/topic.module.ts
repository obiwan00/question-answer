import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedModule } from '@qa/client/app/shared/shared.module';
import { UserTopicsFeedComponent } from '@qa/client/app/topic/components/user-topics-feed/user-topics-feed.component';
import { TopicComponent } from './components/topic/topic.component';
import { TopicsFeedComponent } from './components/topics-feed/topics-feed.component';
import { TopicRoutingModule } from './topic-routing.module';

const COMPONENTS = [
  TopicsFeedComponent,
  UserTopicsFeedComponent,
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

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    TopicRoutingModule,
    SharedModule,
    ...MAT_MODULES,
  ],
  exports: [...COMPONENTS],
})
export class TopicModule { }
