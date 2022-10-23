import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser, UserAuthResponse } from '@qa/api-interfaces';
import { LocalStorageService } from '@qa/client/app/core/services/storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
  ) { }

  public login(payload: LoginUser): Observable<UserAuthResponse> {
    return this.httpClient.post<UserAuthResponse>('/api/users/login', payload);
  }

  public saveToken(token: string): void {
    this.localStorageService.saveData('token', token);
  }
}
