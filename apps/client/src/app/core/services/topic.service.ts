import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@qa/client/app/core/services/auth.service';
import { CreateTopic, TopicResponse, TopicsRequest, TopicsResponse, TopicWithAnswersResponse, UpdateTopic } from '@qa/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TopicService {

  public constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
  ) { }

  public likeTopic(topicId: number): Observable<TopicResponse> {
    if (!this.authService.isLoggedIn) {
      this.authService.showUnauthorizedSnackBar();
      return this.authService.getUnauthorizedError$();
    }

    return this.httpClient.post<TopicResponse>(`/api/topics/${topicId}/like`, null);
  }

  public dislikeTopic(topicId: number): Observable<TopicResponse> {
    if (!this.authService.isLoggedIn) {
      this.authService.showUnauthorizedSnackBar();
      return this.authService.getUnauthorizedError$();
    }

    return this.httpClient.delete<TopicResponse>(`/api/topics/${topicId}/like`);
  }

  public getTopics(params?: TopicsRequest): Observable<TopicsResponse> {
    return this.httpClient.get<TopicsResponse>('api/topics', {
      params: {
        ...params,
      },
    });
  }

  public getTopicWithAnswersBySlug(slug: string): Observable<TopicWithAnswersResponse> {
    return this.httpClient.get<TopicWithAnswersResponse>(`/api/topics/${slug}`);
  }

  public createTopic(createTopicPayload: CreateTopic): Observable<TopicResponse> {
    if (!this.authService.isLoggedIn) {
      this.authService.showUnauthorizedSnackBar();
      return this.authService.getUnauthorizedError$();
    }

    return this.httpClient.post<TopicResponse>(`/api/topics/`, createTopicPayload);
  }

  public editTopic(topicSlug: string, editTopicPayload: UpdateTopic): Observable<TopicResponse> {
    if (!this.authService.isLoggedIn) {
      this.authService.showUnauthorizedSnackBar();
      return this.authService.getUnauthorizedError$();
    }

    return this.httpClient.put<TopicResponse>(`/api/topics/${topicSlug}`, editTopicPayload);
  }

}
