import { FormControl } from "@angular/forms";

export interface FormLoginUser {
  email: FormControl<string>
  password: FormControl<string>
}

export interface FormRegisterUser {
  username: FormControl<string>
  email: FormControl<string>
  password: FormControl<string>
}


