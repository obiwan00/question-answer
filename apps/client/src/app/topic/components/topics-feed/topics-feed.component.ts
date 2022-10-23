import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TopicsResponse } from 'libs/api-interfaces';

@Component({
  templateUrl: './topics-feed.component.html',
  styleUrls: ['./topics-feed.component.scss'],
})
export class TopicsFeedComponent {

  public topics$ = this.http.get<TopicsResponse>('api/topics');

  public constructor(
    private http: HttpClient,
  ) { }



}
