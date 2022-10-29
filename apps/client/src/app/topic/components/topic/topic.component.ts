import { Component, Input } from '@angular/core';
import { TopicService } from '@qa/client/app/core/services/topic.service';
import { Topic } from 'libs/api-interfaces';
import { finalize } from 'rxjs';

@Component({
  selector: 'qa-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent {


  @Input() topic: Topic;

  public isUpdating = false;

  public constructor(
    private topicService: TopicService,
  ) {

  }

  // TODO: add unsubscribe
  public likeTopic() {
    this.isUpdating = true;
    this.topicService.likeTopic(this.topic.id)
      .pipe(finalize(() => this.isUpdating = false))
      .subscribe((topic => {
        this.topic = topic;
      }))
  }

  // TODO: add unsubscribe
  public dislikeTopic() {
    this.isUpdating = true;
    this.topicService.dislikeTopic(this.topic.id)
      .pipe(finalize(() => this.isUpdating = false))
      .subscribe((topic => {
        this.topic = topic;
      }))
  }
}
