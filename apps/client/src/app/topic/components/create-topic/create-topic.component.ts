import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CreateTopic } from '@qa/api-interfaces';
import { TopicService } from '@qa/client/app/core/services/topic.service';
import { finalize, ReplaySubject, takeUntil } from 'rxjs';

interface CreateTopicFormGroup {
  title: FormControl<string>;
  body: FormControl<string>;
  tags: FormControl<string | null>;
}

@Component({
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss'],
})
export class CreateTopicComponent implements OnDestroy {

  public readonly maxTitleLength = 100;
  public readonly maxBodyLength = 2000;
  public readonly maxTagsCount = 8;

  public createTopicForm = this.fb.nonNullable.group<CreateTopicFormGroup>({
    title: this.fb.nonNullable.control('', [Validators.required]),
    body: this.fb.nonNullable.control('', [Validators.required]),
    tags: this.fb.control(null),
  });

  public tags: string[] = [];
  public isCreating = false;

  public readonly separatorKeysCodes = [ENTER, COMMA] as const;

  private destroy$ = new ReplaySubject<void>();

  public constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private topicService: TopicService,
    private router: Router,
  ) {

  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  public createTopic(): void {
    const { title, body } = this.createTopicForm.value;

    if (!title || !body) {
      return;
    }

    const createTopicPayload: CreateTopic = {
      title,
      body,
      tags: this.tags,
    };

    this.isCreating = true;
    this.topicService.createTopic(createTopicPayload)
      .pipe(
        finalize(() => this.isCreating = false),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.showSnackBarForSuccessfulCreating();
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

    this.createTopicForm.get('tags')?.setValue(null);
  }

  public removeTag(tag: string): void {
    const tagIndex = this.tags.indexOf(tag);

    if (tagIndex >= 0) {
      this.tags.splice(tagIndex, 1);
    }
  }

  public get isSubmitDisabled(): boolean {
    return !this.createTopicForm.valid || this.isCreating;
  }

  private showSnackBarForSameTagAdding(): void {
    this.snackBar.open('Such tag is already added', 'OK', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 3000,
    });
  }

  private showSnackBarForSuccessfulCreating(): void {
    this.snackBar.open('Your topic was successfully created', '', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 3000,
    });
  }
}
