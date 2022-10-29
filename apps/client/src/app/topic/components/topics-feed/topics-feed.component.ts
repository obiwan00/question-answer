import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TopicService } from '@qa/client/app/core/services/topic.service';
import { TopicsResponse } from 'libs/api-interfaces';

@Component({
  templateUrl: './topics-feed.component.html',
  styleUrls: ['./topics-feed.component.scss'],
})
export class TopicsFeedComponent {

  public searchQuery: string;
  public topics$ = this.topicService.getTopics();

  public constructor(
    private http: HttpClient,
    private topicService: TopicService,
  ) { }

  fetchTopicsBySearchQuery(searchQuery: string): void {
    this.searchQuery = searchQuery;
    this.topics$ = this.topicService.getTopics({ search: searchQuery });
  }

  fetchTopics() {
    this.searchQuery = '';
    this.topics$ = this.topicService.getTopics();
  }

}
