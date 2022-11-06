import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Message } from '@qa/api-interfaces';
import { AuthService } from '@qa/client/app/core/services/auth.service';
import { ChatService } from '@qa/client/app/core/services/chat.service';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'qa-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit, OnDestroy {

  @Input() public topicId: number;

  @ViewChild(CdkVirtualScrollViewport)
  private viewport: CdkVirtualScrollViewport;

  public messages: Message[] = [];

  private destroy$ = new ReplaySubject<void>();

  public constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
  ) { }

  // TODO: refactor
  public ngOnInit(): void {
    this.chatService.joinChat(this.topicId);

    this.initChatHistorySubscriptions();
    this.initNewMessageSubscriptions();
  }

  public ngOnDestroy(): void {
    this.chatService.disconnect();

    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  public get isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  public isCurrentUser(userId: number): boolean {
    return this.authService?.user?.id === userId;
  }

  public messageTrackBy(index: number, message: Message): number {
    return message?.id;
  }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }

    this.chatService.sendMessage({
      body: message,
      topicId: this.topicId,
    });
  }

  private initChatHistorySubscriptions(): void {
    this.chatService.getChatHistory$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(messages => {
        this.messages = [...this.messages, ...messages];
        this.scrollVirtualScrollToBottom();
      });
  }

  private initNewMessageSubscriptions(): void {
    this.chatService.getNewChatMessage$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(message => {
        this.messages = [...this.messages, message];
        this.scrollVirtualScrollToBottom();
      });
  }

  private scrollVirtualScrollToBottom(): void {
    this.cdr.detectChanges();
    this.viewport.scrollTo({
      bottom: 0,
    });
    this.cdr.detectChanges();
    setTimeout(() => {
      this.viewport.scrollTo({
        bottom: 0,
      });
    }, 0);
  }
}
