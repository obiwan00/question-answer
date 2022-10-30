import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@qa/client/app/core/services/auth.service';
import { TopicService } from '@qa/client/app/core/services/topic.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TopicAuthorGuard implements CanActivate {

  public constructor(
    private authService: AuthService,
    private topicService: TopicService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const topicSlug = route.paramMap.get('topicSlug');

    if (!topicSlug) {
      return false;
    }

    return this.topicService.getTopicWithAnswersBySlug(topicSlug)
      .pipe(
        map((topicWithAnswers) => {
          const isCurrentUserTopicAuthor = topicWithAnswers.author.id === this.authService.user?.id;

          if (isCurrentUserTopicAuthor) {
            route.data = { ...route.data, topicWithAnswers };
            return isCurrentUserTopicAuthor;
          } else {
            this.showUnauthorizedSnackBar();
            return this.router.parseUrl('/');
          }
        }),
      );
  }

  private showUnauthorizedSnackBar(): void {
    this.snackBar.open('You don\'t have permission to edit other users topics', 'OK', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 3000,
    });
  }

}
