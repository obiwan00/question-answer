import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopicSingleComponent } from '@qa/client/app/topic/components/topic-single/topic-single.component';
import { TopicsFeedComponent } from '@qa/client/app/topic/components/topics-feed/topics-feed.component';

export const topicRoutes: Routes = [
  { path: '', component: TopicsFeedComponent },
  { path: ':topicSlug', component: TopicSingleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(topicRoutes)],
  exports: [RouterModule],
})
export class TopicRoutingModule { }
