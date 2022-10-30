import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnswerService } from '@qa/client/app/core/services/answer.service';
import { AuthService } from '@qa/client/app/core/services/auth.service';
import { TopicService } from '@qa/client/app/core/services/topic.service';
import { Answer, TopicWithAnswers } from 'libs/api-interfaces';
import { finalize, Observable, ReplaySubject, takeUntil, tap } from 'rxjs';

@Component({
  templateUrl: './topic-single.component.html',
  styleUrls: ['./topic-single.component.scss'],
})
export class TopicSingleComponent implements OnInit {

  public isLoadingTopicWithAnswers: boolean;
  public isAnswersLoading: boolean;
  public topicWithAnswers: TopicWithAnswers;
  public isCurrentUserTopicAuthor: boolean;

  private destroy$ = new ReplaySubject<void>();

  public constructor(
    private route: ActivatedRoute,
    private topicService: TopicService,
    private authService: AuthService,
    private answerService: AnswerService,
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
      tap((topicWithAnswer) => {
        this.isCurrentUserTopicAuthor = topicWithAnswer.author.id === this.authService.user?.id
      }),
      finalize(() => this.isLoadingTopicWithAnswers = false),
      takeUntil(this.destroy$),
    );
  }

  private updateAnswersAndAnswersMetadata(answers: Answer[]) {
    this.topicWithAnswers.answersCount = answers.length
    this.topicWithAnswers.hasAcceptedAnswer = !!answers.find(answer => answer.accepted)
    this.topicWithAnswers.answers = answers;
  }

}
