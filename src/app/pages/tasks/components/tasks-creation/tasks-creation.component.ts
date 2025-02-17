import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {TasksService} from "../../../../core/services/tasks.service";
import {CurrentUserService} from "../../../../core/services/current-user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {CommonTasksService} from "../../services/common-tasks.service";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {LoaderComponent} from "../../../../shared/loader/loader.component";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-tasks-creation',
  standalone: true,
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatRadioGroup,
    MatRadioButton,
    LoaderComponent,
    MatIcon,
    MatLabel,
    MatInput,
    MatButton,
    FormsModule
  ],
  templateUrl: './tasks-creation.component.html',
})
export class TasksCreationComponent {
  public loading: boolean = false;
  public taskFormGroup: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    completed: new FormControl(false, [Validators.required]),
  })

  private _commonTasksService = inject(CommonTasksService);

  constructor(private _tasksService: TasksService,
              public _snackBar: MatSnackBar) {
  }

  public get titleControl(): FormControl {
    return this.taskFormGroup.get('title') as FormControl;
  }

  public get descriptionControl(): FormControl {
    return this.taskFormGroup.get('description') as FormControl;
  }

  public get completedControl(): FormControl {
    return this.taskFormGroup.get('completed') as FormControl;
  }

  onAddNote() {
    if (this.taskFormGroup.invalid) return;
    this.loading = true;
    this._tasksService.create({
      ...this.taskFormGroup.value,
    }).subscribe(rs => {
      if (rs) {
        this._commonTasksService.fireTaskChangeEvent();
        this.resetForm();
        this.loading = false;
        this.displayNotification('Success: Task Created');
      }
    })
  }

  public get invalidForm(): boolean {
    return !this.taskFormGroup.valid;
  }

  public resetForm() {
    this.taskFormGroup.reset({
      title: '',
      description: '',
      completed: false,
    });
    this.taskFormGroup.markAsPristine();
    this.taskFormGroup.markAsUntouched();
    this.taskFormGroup.updateValueAndValidity();
  }

  public displayNotification(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    })
  }
}
