import { Component, Input } from '@angular/core';
import { TopicService } from '@qa/client/app/core/services/topic.service';
import { Topic } from 'libs/api-interfaces';
import { finalize, ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'qa-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent {

  @Input() topic: Topic;

  public isUpdating = false;
  private destroy$ = new ReplaySubject<void>();

  public constructor(
    private topicService: TopicService,
  ) { }

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
}
