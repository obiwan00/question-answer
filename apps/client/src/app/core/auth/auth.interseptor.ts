import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "@qa/client/app/core/services/auth.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  public constructor(
    private authService: AuthService,
  ) { }

  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const jwtToken = this.authService.user?.token;

    if (!jwtToken) {
      return next.handle(req);
    }

    const cloned = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${jwtToken}`),
    });

    return next.handle(cloned);
  }
}
