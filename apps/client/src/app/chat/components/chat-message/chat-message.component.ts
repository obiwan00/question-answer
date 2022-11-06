import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Message } from 'libs/api-interfaces';

@Component({
  selector: 'qa-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageComponent {
  @Input() message: Message;
  @Input() isMessageAuthorCurrentUser: boolean;

}
