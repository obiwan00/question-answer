import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'qa-chat-message-input',
  templateUrl: './chat-message-input.component.html',
  styleUrls: ['./chat-message-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageInputComponent {

  @Output() public sendMessage = new EventEmitter<string>();

  public messageInputForm = this.fb.nonNullable.group({
    message: this.fb.nonNullable.control(''),
  });

  public constructor(
    private fb: FormBuilder,
  ) { }

  public submit(): void {
    this.sendMessage.emit(this.messageInputForm.value.message);
    this.resetFormValue();
  }

  private resetFormValue(): void {
    this.messageInputForm.setValue({
      message: '',
    });
  }

}
