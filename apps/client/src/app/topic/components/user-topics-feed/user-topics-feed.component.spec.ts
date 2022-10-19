import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTopicsFeedComponent } from './user-topics-feed.component';

describe('UserTopicsFeedComponent', () => {
  let component: UserTopicsFeedComponent;
  let fixture: ComponentFixture<UserTopicsFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserTopicsFeedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserTopicsFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
