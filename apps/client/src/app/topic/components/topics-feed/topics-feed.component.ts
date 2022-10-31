import { Component } from '@angular/core';
import { TopicService } from '@qa/client/app/core/services/topic.service';
import { TopicsRequest, TopicsResponse } from '@qa/api-interfaces';
import { finalize, Observable } from 'rxjs';

@Component({
  templateUrl: './topics-feed.component.html',
  styleUrls: ['./topics-feed.component.scss'],
})
export class TopicsFeedComponent {

  public isLoading = false;
  public topics$ = this.getTopicsByQueryParams();
  public topicRequestQueryParams: TopicsRequest = {};

  public constructor(
    private topicService: TopicService,
  ) { }

  public fetchTopicsBySearchQuery(searchQuery: string): void {
    if (!searchQuery) {
      return;
    }

    this.topicRequestQueryParams.search = searchQuery;
    this.topics$ = this.getTopicsByQueryParams();
  }

  public resetTopicsSearchAndFetchTopics(): void {
    if (!this.topicRequestQueryParams.search) {
      return;
    }

    delete this.topicRequestQueryParams.search;

    this.topics$ = this.getTopicsByQueryParams();
  }

  private getTopicsByQueryParams(): Observable<TopicsResponse> {
    this.isLoading = true;
    return this.topicService.getTopics(this.topicRequestQueryParams)
      .pipe(finalize(() => { this.isLoading = false }));
  }

}
