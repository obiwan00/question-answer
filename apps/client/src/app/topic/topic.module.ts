import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicRoutingModule } from './topic-routing.module';
import { TopicsFeedComponent } from './components/topics-feed/topics-feed.component';

const COMPONENTS = [
  TopicsFeedComponent,
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
