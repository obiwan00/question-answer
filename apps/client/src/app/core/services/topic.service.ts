import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@qa/client/app/core/services/auth.service';
import { TopicResponse } from 'libs/api-interfaces';
import { exhaustMap, filter, finalize, iif, Observable, of, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TopicService {

  public constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
  ) { }

  public likeTopic(topicId: number): Observable<TopicResponse | null> {
    const likeTopic$ = this.httpClient.post<TopicResponse>(`/api/topics/${topicId}/like`, null);
    const showLoginSnackBar$ = this.authService.showLoginSnackBar$();

    return this.authService.user$.pipe(
      take(1), // to trigger finalize of parent Observable
      exhaustMap((user) => iif<TopicResponse, null>(() => !!user, likeTopic$, showLoginSnackBar$)),
    );
  }

  public dislikeTopic(topicId: number): Observable<TopicResponse | null> {
    const dislikeTopic$ = this.httpClient.delete<TopicResponse>(`/api/topics/${topicId}/like`);
    const showLoginSnackBar$ = this.authService.showLoginSnackBar$();

    return this.authService.user$.pipe(
      take(1), // to trigger finalize of parent Observable
      exhaustMap((user) => iif<TopicResponse, null>(() => !!user, dislikeTopic$, showLoginSnackBar$)),
    );
  }


}
