import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormLoginUser } from '@qa/client/app/core/models/auth.model';
import { AuthService } from '@qa/client/app/core/services/auth.service';
import { partialToRequiredGuard } from '@qa/client/app/core/utils/type-guard.util';
import { LoginUser, UserAuthResponse } from 'libs/api-interfaces';
import { catchError, finalize, throwError } from 'rxjs';



@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  public serverErrorMessage: string | null;
  public isLoginDataSubmitting = false;
  public shouldHidePassword = true;

  public loginForm = this.fb.group<FormLoginUser>({
    email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
    password: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(7)]),
  });

  public constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  public get shouldDisableSubmit(): boolean {
    return !this.loginForm.valid || this.isLoginDataSubmitting;
  }

  public togglePasswordShowing(): void {
    this.shouldHidePassword = !this.shouldHidePassword;
  }

  public submitLogin(): void {
    const loginPayload = this.loginForm.value

    if (!partialToRequiredGuard<LoginUser>(loginPayload)) {
      return;
    }


    this.serverErrorMessage = null;

    this.loginForm.disable();
    this.isLoginDataSubmitting = true;

    this.authService.login(loginPayload)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.serverErrorMessage = error?.error?.message;

          return throwError(error);
        }),
        finalize(() => {
          this.isLoginDataSubmitting = false;
          this.loginForm.enable();
        }),
      )
      .subscribe((loginResponse: UserAuthResponse) => {
        this.authService.saveToken(loginResponse.token)
        this.router.navigate(['/']);
      });
  }

  public shouldShowErrorMessages(fieldName: keyof FormLoginUser) {
    const control = this.loginForm.get(fieldName);

    return control?.invalid && (control.dirty || control.touched)
  }

  public getFieldErrorsKeys(fieldName: keyof FormLoginUser): ValidationErrors | null | undefined {
    return this.loginForm.get(fieldName)?.errors;
  }

}
