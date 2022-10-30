import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '@qa/client/app/core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  public constructor(
    private authService: AuthService,
  ) {
  }

  public canActivate(): boolean {
    if (!this.authService.isLoggedIn) {
      this.authService.showUnauthorizedSnackBar();
      return false;
    }

    return true;
  }

}
