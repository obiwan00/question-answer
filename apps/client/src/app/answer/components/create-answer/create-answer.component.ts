import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Answer, CreateAnswer } from '@qa/api-interfaces';
import { AnswerService } from '@qa/client/app/core/services/answer.service';
import { finalize, ReplaySubject, takeUntil } from 'rxjs';

interface CreateAnswerFormGroup {
  body: FormControl<string>;
}

@Component({
  selector: 'qa-create-answer',
  templateUrl: './create-answer.component.html',
  styleUrls: ['./create-answer.component.scss'],
})
export class CreateAnswerComponent implements OnDestroy {

  @Input() public topicId: number;
  private _disabled: boolean;
  @Input() public set disabled(isDisabled: boolean) {
    this._disabled = isDisabled;
    if (isDisabled) {
      this.createAnswerForm.disable();
    } else {
      this.createAnswerForm.enable();
    }
  }

  @Output() public cancel = new EventEmitter<void>();
  @Output() public create = new EventEmitter<Answer>();

  public readonly maxTitleLength = 100;
  public readonly maxBodyLength = 2000;
  public readonly maxTagsCount = 8;

  public createAnswerForm = this.fb.nonNullable.group<CreateAnswerFormGroup>({
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

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  public createAnswer(): void {
    const { body } = this.createAnswerForm.value;

    if (!body) {
      return;
    }

    const createAnswerPayload: CreateAnswer = {
      body,
      topicId: this.topicId,
    };

    this.isCreating = true;
    this.answerService.createAnswer(createAnswerPayload)
      .pipe(
        finalize(() => this.isCreating = false),
        takeUntil(this.destroy$),
      )
      .subscribe((answer: Answer) => {
        this.showSnackBarForSuccessfulCreating();
        this.create.emit(answer);
      });
  }

  public get isSubmitDisabled(): boolean {
    return !this.createAnswerForm.valid || this.isCreating;
  }

  public handleCancelClick(): void {
    this.cancel.emit();
  }

  private showSnackBarForSuccessfulCreating(): void {
    this.snackBar.open('Your answer was successfully added', '', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 3000,
    });
  }
}
