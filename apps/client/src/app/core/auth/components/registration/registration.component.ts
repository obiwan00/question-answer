import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormRegisterUser } from '@qa/client/app/core/models/auth.model';
import { AuthService } from '@qa/client/app/core/services/auth.service';
import { partialToRequiredGuard } from '@qa/client/app/core/utils/type-guard.util';
import { CreateUser, LoginUser, UserAuthResponse } from 'libs/api-interfaces';
import { catchError, finalize, throwError } from 'rxjs';

@Component({
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {

  public serverErrorMessage: string | null;
  public isRegistrationDataSubmitting = false;
  public shouldHidePassword = true;

  public registrationForm = this.fb.group<FormRegisterUser>({
    username: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(2)]),
    email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
    password: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(7)]),
  });

  public constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  public get shouldDisableSubmit(): boolean {
    return !this.registrationForm.valid || this.isRegistrationDataSubmitting;
  }

  public togglePasswordShowing(): void {
    this.shouldHidePassword = !this.shouldHidePassword;
  }

  public submitRegistration(): void {
    const registrationPayload = this.registrationForm.value

    if (!partialToRequiredGuard<CreateUser>(registrationPayload)) {
      return;
    }


    this.serverErrorMessage = null;

    this.registrationForm.disable();
    this.isRegistrationDataSubmitting = true;

    this.authService.register(registrationPayload)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.serverErrorMessage = error?.error?.message;

          return throwError(error);
        }),
        finalize(() => {
          this.isRegistrationDataSubmitting = false;
          this.registrationForm.enable();
        }),
      )
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  public shouldShowErrorMessages(fieldName: keyof FormRegisterUser) {
    const control = this.registrationForm.get(fieldName);

    return control?.invalid && (control.dirty || control.touched)
  }

  public getFieldErrorsKeys(fieldName: keyof FormRegisterUser): ValidationErrors | null | undefined {
    return this.registrationForm.get(fieldName)?.errors;
  }
}
