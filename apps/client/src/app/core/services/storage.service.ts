import { Injectable } from '@angular/core';
import { LocalStorageKey as LocalStorageKey } from '@qa/client/app/core/models/storage.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  public saveData(key: LocalStorageKey, value: string): void {
    localStorage.setItem(key, value);
  }

  public saveStringifiedData(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getData(key: string): string | null {
    return localStorage.getItem(key);
  }

  public getParsedData<T>(key: string): T | null {
    const storageValueByKey = this.getData(key);

    if (!storageValueByKey) {
      return null;
    }

    return JSON.parse(storageValueByKey);
  }

  public removeData(key: string): void {
    localStorage.removeItem(key);
  }

  public clearData(): void {
    localStorage.clear();
  }
}
