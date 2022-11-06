import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { AnswerModule } from '@qa/client/app/answer/answer.module';
import { ChatModule } from '@qa/client/app/chat/chat.module';
import { RatingModule } from '@qa/client/app/modules/components/rating/rating.module';
import { SearchBarModule } from '@qa/client/app/modules/components/search-bar/search-bar.module';
import { SharedModule } from '@qa/client/app/shared/shared.module';
import { EditTopicComponent } from '@qa/client/app/topic/components/edit-topic/edit-topic.component';
import { TopicSingleComponent } from '@qa/client/app/topic/components/topic-single/topic-single.component';
import { CreateTopicComponent } from './components/create-topic/create-topic.component';
import { TopicComponent } from './components/topic/topic.component';
import { TopicsFeedComponent } from './components/topics-feed/topics-feed.component';
import { TopicRoutingModule } from './topic-routing.module';
import { MatTabsModule } from '@angular/material/tabs';


const COMPONENTS = [TopicsFeedComponent, TopicComponent, TopicSingleComponent, CreateTopicComponent, EditTopicComponent];

const MAT_MODULES = [
  MatChipsModule,
  MatTabsModule,
];

const APP_MODULES = [
  RatingModule,
  SearchBarModule,
  AnswerModule,
  ChatModule,
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
})
export class TopicModule { }
