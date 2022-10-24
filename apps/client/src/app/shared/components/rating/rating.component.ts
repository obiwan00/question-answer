import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LikeStatus } from 'libs/api-interfaces';

@Component({
  selector: 'qa-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {
  @Input() rating: number;
  @Input() likeStatus: LikeStatus;
  @Input() disabled: boolean;

  @Output() like = new EventEmitter<void>();
  @Output() dislike = new EventEmitter<void>();

  public LikeStatus = LikeStatus;

  public emitLike(): void {
    this.like.emit();
  }

  public emitDislike(): void {
    this.dislike.emit();
  }
}
