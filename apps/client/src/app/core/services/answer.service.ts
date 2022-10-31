import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@qa/client/app/core/services/auth.service';
import { AnswerResponse } from '@qa/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {

  public constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
  ) { }

  public likeAnswer(answerId: number): Observable<AnswerResponse> {
    if (!this.authService.isLoggedIn) {
      this.authService.showUnauthorizedSnackBar();
      return this.authService.getUnauthorizedError$();
    }

    return this.httpClient.post<AnswerResponse>(`/api/answers/${answerId}/like`, null);
  }

  public dislikeAnswer(answerId: number): Observable<AnswerResponse> {
    if (!this.authService.isLoggedIn) {
      this.authService.showUnauthorizedSnackBar();
      return this.authService.getUnauthorizedError$();
    }

    return this.httpClient.delete<AnswerResponse>(`/api/answers/${answerId}/like`);
  }

  public acceptAnswer(answerId: number): Observable<AnswerResponse[]> {
    if (!this.authService.isLoggedIn) {
      this.authService.showUnauthorizedSnackBar();
      return this.authService.getUnauthorizedError$();
    }

    return this.httpClient.post<AnswerResponse[]>(`/api/answers/${answerId}`, null);
  }

}
