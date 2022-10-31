import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { AnswerService } from '@qa/client/app/core/services/answer.service';
import { Answer } from '@qa/api-interfaces';
import { finalize, ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'qa-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
})
export class AnswerComponent implements OnDestroy {

  @Input() public answer: Answer;
  @Input() public showAcceptButton: boolean;
  @Input() public disabled: boolean;

  @Output() public accept = new EventEmitter<number>();
  @Output() public edit = new EventEmitter<number>();
  @Output() public loading = new EventEmitter<boolean>();

  public _isLoading = false;
  public get isLoading(): boolean {
    return this._isLoading;
  }

  public set isLoading(value: boolean) {
    this._isLoading = value;
    this.loading.emit(value);
  }

  private destroy$ = new ReplaySubject<void>();

  public constructor(
    private answerService: AnswerService,
  ) { }

  public get isDisabled(): boolean {
    return this.disabled || this.isLoading;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  public likeAnswer(): void {
    this.isLoading = true;
    this.answerService.likeAnswer(this.answer.id)
      .pipe(
        finalize(() => this.isLoading = false),
        takeUntil(this.destroy$),
      )
      .subscribe((answer => {
        this.answer = answer;
      }));
  }

  public dislikeAnswer(): void {
    this.isLoading = true;
    this.answerService.dislikeAnswer(this.answer.id)
      .pipe(
        finalize(() => this.isLoading = false),
        takeUntil(this.destroy$),
      )
      .subscribe((answer => {
        this.answer = answer;
      }));
  }

  public editAnswer(): void {
    this.edit.emit(this.answer.id);
  }

  public acceptAnswer(): void {
    this.accept.emit(this.answer.id);
  }
}
