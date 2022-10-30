import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@qa/client/app/core/guards/auth.guard';
import { TopicAuthorGuard } from '@qa/client/app/core/guards/topic-author.guard';
import { CreateTopicComponent } from '@qa/client/app/topic/components/create-topic/create-topic.component';
import { EditTopicComponent } from '@qa/client/app/topic/components/edit-topic/edit-topic.component';
import { TopicSingleComponent } from '@qa/client/app/topic/components/topic-single/topic-single.component';
import { TopicsFeedComponent } from '@qa/client/app/topic/components/topics-feed/topics-feed.component';

export const topicRoutes: Routes = [
  { path: '', component: TopicsFeedComponent },
  { path: 'create', component: CreateTopicComponent, canActivate: [AuthGuard] },
  { path: 'edit/:topicSlug', component: EditTopicComponent, canActivate: [AuthGuard, TopicAuthorGuard] },
  { path: ':topicSlug', component: TopicSingleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(topicRoutes)],
  exports: [RouterModule],
})
export class TopicRoutingModule { }
