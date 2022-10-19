import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopicsFeedComponent } from '@qa/client/app/topic/components/topics-feed/topics-feed.component';
import { UserTopicsFeedComponent } from '@qa/client/app/topic/components/user-topics-feed/user-topics-feed.component';

export const topicRoutes: Routes = [
  { path: '', component: TopicsFeedComponent },
  { path: 'user', component: UserTopicsFeedComponent },
];

@NgModule({
  imports: [RouterModule.forChild(topicRoutes)],
  exports: [RouterModule],
})
export class TopicRoutingModule { }
