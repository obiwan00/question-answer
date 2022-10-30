import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AnswerModule } from '@qa/client/app/answer/answer.module';
import { RatingModule } from '@qa/client/app/modules/components/rating/rating.module';
import { SearchBarModule } from '@qa/client/app/modules/components/search-bar/search-bar.module';
import { SharedModule } from '@qa/client/app/shared/shared.module';
import { TopicSingleComponent } from '@qa/client/app/topic/components/topic-single/topic-single.component';
import { CreateTopicComponent } from './components/create-topic/create-topic.component';
import { TopicComponent } from './components/topic/topic.component';
import { TopicsFeedComponent } from './components/topics-feed/topics-feed.component';
import { TopicRoutingModule } from './topic-routing.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

const COMPONENTS = [TopicsFeedComponent, TopicComponent, TopicSingleComponent, CreateTopicComponent];

const MAT_MODULES = [
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatChipsModule,
  MatIconModule,
];

const APP_MODULES = [RatingModule, SearchBarModule, AnswerModule];

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
