import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'question-answer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public tags$ = this.http.get<string[]>('/api/tags');

  public constructor(private http: HttpClient) { }
}
