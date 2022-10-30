import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

interface SearchFormGroup {
  search: FormControl<string>;
}

@Component({
  selector: 'qa-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  private _searchBarText: string;
  @Input() public set searchBarText(value: string) {
    this._searchBarText = value;
    this.searchForm.get('search')?.setValue(value);
  }

  public get searchBarText(): string {
    return this._searchBarText;
  }

  private _disabled: boolean;
  @Input() public set disabled(isDisabled: boolean) {
    this._disabled = isDisabled;
    if (isDisabled) {
      this.searchForm.disable();
    } else {
      this.searchForm.enable();
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  @Output() public search = new EventEmitter<string>();
  @Output() public resetSearch = new EventEmitter<void>();

  public searchForm = this.fb.nonNullable.group<SearchFormGroup>({
    search: this.fb.nonNullable.control(''),
  });

  public constructor(
    private fb: FormBuilder,
  ) {
  }

  public submit(): void {
    this.search.emit(this.searchForm.getRawValue().search);
  }

  public reset(): void {
    this.searchForm.setValue({
      search: '',
    });
    this.resetSearch.emit();
  }

}
