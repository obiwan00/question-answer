import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserTopicsFeedComponent } from '@qa/client/app/topic/components/user-topics-feed/user-topics-feed.component';
import { TopicsFeedComponent } from './components/topics-feed/topics-feed.component';
import { TopicRoutingModule } from './topic-routing.module';

const COMPONENTS = [
  TopicsFeedComponent,
  UserTopicsFeedComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    TopicRoutingModule,
  ],
  exports: [
    ...COMPONENTS,
  ],
})
export class TopicModule { }
