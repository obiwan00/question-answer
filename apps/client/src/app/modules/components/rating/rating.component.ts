import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LikeStatus } from 'libs/api-interfaces';

@Component({
  selector: 'qa-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {
  @Input() public rating: number;
  @Input() public likeStatus: LikeStatus;
  @Input() public disabled: boolean;

  @Output() public like = new EventEmitter<void>();
  @Output() public dislike = new EventEmitter<void>();

  public LikeStatus = LikeStatus;

  public emitLike(): void {
    this.like.emit();
  }

  public emitDislike(): void {
    this.dislike.emit();
  }
}
