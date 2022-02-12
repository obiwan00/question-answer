import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@question-answer/api-interfaces';

@Component({
  selector: 'question-answer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public options = ['Option 1', 'Option 2', 'Option 3']
  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient) {}
}
