import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsFeedComponent } from './topics-feed.component';

describe('TopicsFeedComponent', () => {
  let component: TopicsFeedComponent;
  let fixture: ComponentFixture<TopicsFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopicsFeedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopicsFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
