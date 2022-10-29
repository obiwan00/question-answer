import { Component } from '@angular/core';
import { TopicService } from '@qa/client/app/core/services/topic.service';
import { TopicsRequest, TopicsResponse } from 'libs/api-interfaces';
import { finalize, Observable } from 'rxjs';

@Component({
  templateUrl: './topics-feed.component.html',
  styleUrls: ['./topics-feed.component.scss'],
})
export class TopicsFeedComponent {

  public isLoading = false;
  public searchQuery: string;
  public topics$ = this.getTopics();

  public constructor(
    private topicService: TopicService,
  ) { }

  public fetchTopicsBySearchQuery(searchQuery: string): void {
    this.searchQuery = searchQuery;
    this.topics$ = this.getTopics({ search: searchQuery });
  }

  public resetTopicsSearchAndFetchTopics(): void {
    this.searchQuery = '';
    this.topics$ = this.getTopics();
  }

  private getTopics(queryParams?: TopicsRequest): Observable<TopicsResponse> {
    this.isLoading = true;
    return this.topicService.getTopics(queryParams)
      .pipe(finalize(() => { this.isLoading = false }));
  }

}
