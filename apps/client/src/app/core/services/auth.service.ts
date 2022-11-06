import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticatedUser, CreateUser, LoginUser, UserAuthResponse } from '@qa/api-interfaces';
import { SocketService } from '@qa/client/app/core/services/socket.service';
import { UserStorageService } from '@qa/client/app/core/services/user-storage.service';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private user$$ = new BehaviorSubject<AuthenticatedUser | null>(null);
  public user$ = this.user$$.asObservable();

  public constructor(
    private httpClient: HttpClient,
    private userStorageService: UserStorageService,
    private snackBar: MatSnackBar,
    private socketService: SocketService,
  ) {
    this.initUser();
  }

  public initUser(): void {
    const storedAuthenticatedUser = this.userStorageService.getUser();
    this.user$$.next(storedAuthenticatedUser);

    this.socketService.setNewSocket();
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
    this.userStorageService.removeUser();
    this.user$$.next(null);

    this.socketService.setNewSocket();
  }

  public register(payload: CreateUser): Observable<UserAuthResponse> {
    return this.httpClient.post<UserAuthResponse>('/api/users', payload)
      .pipe(
        tap((registrationResponse: UserAuthResponse) => {
          this.setAuthorizedUser(registrationResponse);
        }),
      );
  }

  public get user(): AuthenticatedUser | null {
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

  private setAuthorizedUser(authorizedUser: AuthenticatedUser): void {
    this.user$$.next(authorizedUser);
    this.userStorageService.saveUser(authorizedUser);

    this.socketService.setNewSocket();
  }

}
