import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Answer, TopicWithAnswers } from '@qa/api-interfaces';
import { AnswerService } from '@qa/client/app/core/services/answer.service';
import { AuthService } from '@qa/client/app/core/services/auth.service';
import { TopicService } from '@qa/client/app/core/services/topic.service';
import { finalize, Observable, ReplaySubject, takeUntil } from 'rxjs';

@Component({
  templateUrl: './topic-single.component.html',
  styleUrls: ['./topic-single.component.scss'],
})
export class TopicSingleComponent implements OnInit, OnDestroy {

  public isLoadingTopicWithAnswers = false;
  public isAnswersLoading = false;
  public isCreatingAnswer = false;
  public isShowingCreateAnswer = false;

  public topicWithAnswers: TopicWithAnswers;
  public answerToEditId: number | null = null;

  private destroy$ = new ReplaySubject<void>();

  public constructor(
    private route: ActivatedRoute,
    private topicService: TopicService,
    private answerService: AnswerService,
    private authService: AuthService,
  ) { }

  public ngOnInit(): void {
    this.initTopicWithAnswers();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  public acceptAnswerById(answerId: number): void {
    this.isAnswersLoading = true;
    this.answerService.acceptAnswer(answerId)
      .pipe(
        finalize(() => this.isAnswersLoading = false),
        takeUntil(this.destroy$),
      )
      .subscribe(((answers: Answer[]) => {
        this.updateAnswersAndAnswersMetadata(answers);
      }));
  }

  public handleAnswerLoading(isAnswersLoading: boolean): void {
    this.isAnswersLoading = isAnswersLoading;
  }

  public handleAddNewAnswerClick(): void {
    if (!this.authService.isLoggedIn) {
      this.authService.showUnauthorizedSnackBar();

      return;
    }

    this.isShowingCreateAnswer = true;
  }

  public handleCancelCreateAnswer(): void {
    this.isShowingCreateAnswer = false;
  }

  public handleCreateNewAnswer(answer: Answer): void {
    this.topicWithAnswers.answers.unshift(answer);
    this.topicWithAnswers.answersCount++;

    this.isShowingCreateAnswer = false;
  }

  public editAnswerById(answerToEditId: number): void {
    this.answerToEditId = answerToEditId;
  }

  public handleCancelEditAnswer(): void {
    this.answerToEditId = null;
  }

  public handleEditAnswer(editedAnswer: Answer): void {
    const answerToReplaceByEditedOne = this.topicWithAnswers.answers.findIndex(answer => answer.id === editedAnswer.id);
    this.topicWithAnswers.answers.splice(answerToReplaceByEditedOne, 1, editedAnswer);

    this.answerToEditId = null;
  }

  private initTopicWithAnswers(): void {
    const routeParams = this.route.snapshot.paramMap;
    const topicSlug = routeParams.get('topicSlug');

    if (!topicSlug) {
      return;
    }

    this.getTopicWithAnswersBySlug(topicSlug).subscribe((topicWithAnswers) => {
      this.topicWithAnswers = topicWithAnswers;
    });
  }

  private getTopicWithAnswersBySlug(slug: string): Observable<TopicWithAnswers> {
    this.isLoadingTopicWithAnswers = true;
    return this.topicService.getTopicWithAnswersBySlug(slug).pipe(
      finalize(() => this.isLoadingTopicWithAnswers = false),
      takeUntil(this.destroy$),
    );
  }

  private updateAnswersAndAnswersMetadata(answers: Answer[]): void {
    this.topicWithAnswers.answersCount = answers.length;
    this.topicWithAnswers.hasAcceptedAnswer = !!answers.find(answer => answer.accepted);
    this.topicWithAnswers.answers = answers;
  }

}
