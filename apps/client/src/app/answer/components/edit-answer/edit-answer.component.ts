import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Answer, UpdateAnswer } from '@qa/api-interfaces';
import { AnswerService } from '@qa/client/app/core/services/answer.service';
import { finalize, ReplaySubject, takeUntil } from 'rxjs';

interface EditAnswerFormGroup {
  body: FormControl<string>;
}

@Component({
  selector: 'qa-edit-answer',
  templateUrl: './edit-answer.component.html',
  styleUrls: ['./edit-answer.component.scss'],
})
export class EditAnswerComponent implements OnInit, OnDestroy {

  @Input() public answer: Answer;
  private _disabled: boolean;
  @Input() public set disabled(isDisabled: boolean) {
    this._disabled = isDisabled;
    if (isDisabled) {
      this.editAnswerForm.disable();
    } else {
      this.editAnswerForm.enable();
    }
  }

  @Output() public cancel = new EventEmitter<void>();
  @Output() public edit = new EventEmitter<Answer>();

  public readonly maxTitleLength = 100;
  public readonly maxBodyLength = 2000;
  public readonly maxTagsCount = 8;

  public editAnswerForm = this.fb.nonNullable.group<EditAnswerFormGroup>({
    body: this.fb.nonNullable.control('', [Validators.required]),
  });

  public tags: string[] = [];
  public isCreating = false;

  public readonly separatorKeysCodes = [ENTER, COMMA] as const;

  private destroy$ = new ReplaySubject<void>();

  public constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private answerService: AnswerService,
  ) {

  }

  public ngOnInit(): void {
    this.editAnswerForm.patchValue({
      body: this.answer.body,
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  public editAnswer(): void {
    const { body } = this.editAnswerForm.value;

    if (!body) {
      return;
    }

    const editAnswerPayload: UpdateAnswer = {
      body,
    };

    this.isCreating = true;
    this.answerService.editAnswer(this.answer.id, editAnswerPayload)
      .pipe(
        finalize(() => this.isCreating = false),
        takeUntil(this.destroy$),
      )
      .subscribe((answer: Answer) => {
        this.showSnackBarForSuccessfulCreating();
        this.edit.emit(answer);
      });
  }

  public get isSubmitDisabled(): boolean {
    return !this.editAnswerForm.valid || this.isCreating;
  }

  public handleCancelClick(): void {
    this.cancel.emit();
  }

  private showSnackBarForSuccessfulCreating(): void {
    this.snackBar.open('Your answer was successfully edited', '', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 3000,
    });
  }
}
