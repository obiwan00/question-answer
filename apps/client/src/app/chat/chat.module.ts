import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChatComponent } from '@qa/client/app/chat/components/chat/chat.component';
import { SharedModule } from '@qa/client/app/shared/shared.module';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { ChatMessageInputComponent } from './components/chat-message-input/chat-message-input.component';
import { ScrollingModule } from '@angular/cdk/scrolling';


const COMPONENTS_TO_EXPORT = [
  ChatComponent,
];

const COMPONENTS = [
  ChatMessageComponent,
  ChatMessageInputComponent,
];

const MAT_MODULES = [
  ScrollingModule,
];

@NgModule({
  declarations: [
    ...COMPONENTS_TO_EXPORT,
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ...MAT_MODULES,
  ],
  exports: [...COMPONENTS_TO_EXPORT],
})
export class ChatModule { }
