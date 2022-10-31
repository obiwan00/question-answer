import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@qa/client/app/core/services/auth.service';
import { AuthorizedUser } from '@qa/api-interfaces';

@Component({
  selector: 'qa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  public constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  public get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  public get user(): AuthorizedUser | null {
    return this.authService.user;
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
