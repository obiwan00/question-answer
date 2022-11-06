import { Injectable } from '@angular/core';
import { LocalStorageService } from '@qa/client/app/core/services/storage.service';
import { AuthenticatedUser } from '@qa/api-interfaces';
import { LocalStorageKey } from '@qa/client/app/core/models/storage.model';


@Injectable({
  providedIn: 'root',
})
export class UserStorageService {

  public constructor(private localStorageService: LocalStorageService) { }

  public getUser(): AuthenticatedUser | null {
    return this.localStorageService.getParsedData(LocalStorageKey.AUTHORIZED_USER);
  }

  public saveUser(user: AuthenticatedUser): void {
    this.localStorageService.saveStringifiedData(LocalStorageKey.AUTHORIZED_USER, user);
  }

  public removeUser(): void {
    this.localStorageService.removeData(LocalStorageKey.AUTHORIZED_USER);
  }

}
