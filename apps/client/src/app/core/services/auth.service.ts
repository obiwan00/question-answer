import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthorizedUser, CreateUser, LoginUser, UserAuthResponse } from '@qa/api-interfaces';
import { LocalStorageKey } from '@qa/client/app/core/models/storage.model';
import { LocalStorageService } from '@qa/client/app/core/services/storage.service';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private user$$ = new BehaviorSubject<AuthorizedUser | null>(null);
  public user$ = this.user$$.asObservable();

  public constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private snackBar: MatSnackBar,
  ) {
    this.initUser();
  }

  public initUser(): void {
    this.user$$.next(this.localStorageService.getParsedData(LocalStorageKey.AUTHORIZED_USER));
  }

  public login(payload: LoginUser): Observable<UserAuthResponse> {
    return this.httpClient.post<UserAuthResponse>('/api/users/login', payload)
      .pipe(
        tap((loginResponse: UserAuthResponse) => {
          this.setAuthorizedUser(loginResponse);
        }),
      );
  }

  public logout(): void {
    this.localStorageService.removeData(LocalStorageKey.AUTHORIZED_USER);
    this.user$$.next(null);
  }

  public register(payload: CreateUser): Observable<UserAuthResponse> {
    return this.httpClient.post<UserAuthResponse>('/api/users', payload)
      .pipe(
        tap((registrationResponse: UserAuthResponse) => {
          this.setAuthorizedUser(registrationResponse);
        }),
      );
  }

  public get user(): AuthorizedUser | null {
    return this.user$$.value;
  }

  public get isLoggedIn(): boolean {
    return !!this.user;
  }

  public showUnauthorizedSnackBar(): void {
    this.snackBar.open('You need to be logged in to do it', 'OK', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 3000,
    });
  }

  public getUnauthorizedError$(): Observable<never> {
    return throwError('Unauthorized user');
  }

  private setAuthorizedUser(authorizedUser: AuthorizedUser): void {
    this.user$$.next(authorizedUser);
    this.saveUserToLocalStorage(authorizedUser);
  }

  private saveUserToLocalStorage(user: AuthorizedUser): void {
    this.localStorageService.saveStringifiedData(LocalStorageKey.AUTHORIZED_USER, user);
  }
}
