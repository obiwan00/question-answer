import { Injectable } from '@angular/core';
import { ChatActions, CreateMessage, Message } from '@qa/api-interfaces';
import { SocketService } from '@qa/client/app/core/services/socket.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  public constructor(
    private socketService: SocketService,
  ) {

  }

  public joinChat(topicId: number): void {
    this.socketService.socket.connect();
    console.log('joinChat', topicId);

    this.socketService.socket.emit(ChatActions.JoinChat, topicId);
  }

  public disconnect(): void {
    this.socketService.socket.disconnect();
  }

  public getChatHistory$(): Observable<Message[]> {
    return this.socketService.socket.fromEvent<Message[]>(ChatActions.ChatHistory)
      .pipe(
        tap((messages) => {
          console.log('getChatHistory', messages);
        }),
      );
  }

  public getNewChatMessage$(): Observable<Message> {
    return this.socketService.socket.fromEvent<Message>(ChatActions.AddedMessage)
      .pipe(
        tap((message) => {
          console.log('getNewChatMessages', message);
        }),
      );
  }

  public sendMessage(messagePayload: CreateMessage): void {
    this.socketService.socket.emit(ChatActions.AddMessage, messagePayload);
  }

}
