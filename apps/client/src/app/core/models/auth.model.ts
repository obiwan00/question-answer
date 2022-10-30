import { FormControl } from "@angular/forms";

export interface LoginUserFormGroup {
  email: FormControl<string>
  password: FormControl<string>
}

export interface RegisterUserFormGroup {
  username: FormControl<string>
  email: FormControl<string>
  password: FormControl<string>
}


