import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@qa/client/app/core/services/auth.service';
import { TopicService } from '@qa/client/app/core/services/topic.service';
import { TopicWithAnswers, UpdateTopic } from '@qa/api-interfaces';
import { finalize, ReplaySubject, takeUntil } from 'rxjs';

interface EditTopicFormGroup {
  title: FormControl<string>;
  body: FormControl<string>;
  tags: FormControl<string | null>;
}

@Component({
  templateUrl: './edit-topic.component.html',
  styleUrls: ['./edit-topic.component.scss'],
})
export class EditTopicComponent implements OnInit, OnDestroy {

  public readonly maxTitleLength = 100;
  public readonly maxBodyLength = 2000;
  public readonly maxTagsCount = 8;

  public editTopicForm = this.fb.group<EditTopicFormGroup>({
    title: this.fb.nonNullable.control('', [Validators.required]),
    body: this.fb.nonNullable.control('', [Validators.required]),
    tags: this.fb.control(null),
  });

  public tags: string[] = [];
  public isEditing = false;
  public topicWithAnswers: TopicWithAnswers;
  public isLoadingTopic = false;

  public readonly separatorKeysCodes = [ENTER, COMMA] as const;

  private destroy$ = new ReplaySubject<void>();

  public constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private topicService: TopicService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {

  }

  public ngOnInit(): void {
    this.topicWithAnswers = this.route.snapshot.data['topicWithAnswers'];
    this.setTopicDataToFormVales();
  }


  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  public editTopic(): void {
    const { title, body } = this.editTopicForm.value;

    if (!title || !body) {
      return;
    }

    const editTopicPayload: UpdateTopic = {
      title,
      body,
      tags: this.tags,
    };

    this.isEditing = true;
    this.topicService.editTopic(this.topicWithAnswers.slug, editTopicPayload)
      .pipe(
        finalize(() => this.isEditing = false),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.showSnackBarForSuccessfulEditing();
        this.router.navigate(['/']);
      });
  }

  public addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (!value) {
      return;
    }

    if (this.tags.length >= this.maxTagsCount) {
      return;
    }

    if (this.tags.includes(value)) {
      this.showSnackBarForSameTagAdding();
      return;
    }

    this.tags.push(value);
    event.chipInput.clear();

    this.editTopicForm.get('tags')?.setValue(null);
  }

  public removeTag(tag: string): void {
    const tagIndex = this.tags.indexOf(tag);

    if (tagIndex >= 0) {
      this.tags.splice(tagIndex, 1);
    }
  }

  public get isSubmitDisabled(): boolean {
    return !this.editTopicForm.valid || this.isEditing;
  }

  private showSnackBarForSameTagAdding(): void {
    this.snackBar.open('Such tag is already added', 'OK', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 3000,
    });
  }

  private showSnackBarForSuccessfulEditing(): void {
    this.snackBar.open('Your topic was successfully updated', '', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 3000,
    });
  }

  private setTopicDataToFormVales(): void {
    this.editTopicForm.patchValue({
      title: this.topicWithAnswers.title,
      body: this.topicWithAnswers.body,
    });
    this.tags = this.topicWithAnswers.tags;
  }
}
