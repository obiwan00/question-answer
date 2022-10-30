import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@qa/client/app/core/services/auth.service';
import { TopicService } from '@qa/client/app/core/services/topic.service';
import { Topic } from 'libs/api-interfaces';
import { finalize, ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'qa-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent implements OnInit, OnDestroy {

  @Input() topic: Topic;

  public isUpdating = false;
  public isCurrentUserTopicAuthor: boolean;
  private destroy$ = new ReplaySubject<void>();

  public constructor(
    private topicService: TopicService,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  public ngOnInit(): void {
    this.isCurrentUserTopicAuthor = this.topic.author.id === this.authService.user?.id
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  public likeTopic(): void {
    this.isUpdating = true;
    this.topicService.likeTopic(this.topic.id)
      .pipe(
        finalize(() => this.isUpdating = false),
        takeUntil(this.destroy$),
      )
      .subscribe((topic => {
        this.topic = topic;
      }))
  }

  public dislikeTopic(): void {
    this.isUpdating = true;
    this.topicService.dislikeTopic(this.topic.id)
      .pipe(
        finalize(() => this.isUpdating = false),
        takeUntil(this.destroy$),
      )
      .subscribe((topic => {
        this.topic = topic;
      }))
  }

  public editTopic(): void {
    this.router.navigate(['/topics/edit', this.topic.slug]);
  }
}
