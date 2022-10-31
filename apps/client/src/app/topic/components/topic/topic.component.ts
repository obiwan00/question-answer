import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Topic } from '@qa/api-interfaces';
import { TopicService } from '@qa/client/app/core/services/topic.service';
import { finalize, ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'qa-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent implements OnDestroy {

  @Input() public topic: Topic;

  public isUpdating = false;
  private destroy$ = new ReplaySubject<void>();

  public constructor(
    private topicService: TopicService,
    private router: Router,
  ) {
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
      }));
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
      }));
  }

  public editTopic(): void {
    this.router.navigate(['/topics/edit', this.topic.slug]);
  }
}
