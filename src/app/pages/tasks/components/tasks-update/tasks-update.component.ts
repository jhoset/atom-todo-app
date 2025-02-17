import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {TaskDto, TasksService} from "../../../../core/services/tasks.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {LoaderComponent} from "../../../../shared/loader/loader.component";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatInput} from "@angular/material/input";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {JsonPipe} from "@angular/common";
import {CommonTasksService} from "../../services/common-tasks.service";

@Component({
  selector: 'app-tasks-update',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    ReactiveFormsModule,
    MatDialogActions,
    MatButton,
    LoaderComponent,
    MatCheckbox,
    MatInput,
    MatRadioGroup,
    MatLabel,
    MatRadioButton,
    JsonPipe
  ],
  templateUrl: './tasks-update.component.html',
})
export class TasksUpdateComponent {
  public loading: boolean = false;
  public taskFormGroup!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: (TaskDto | null),
              private _dialogRef: MatDialogRef<TasksUpdateComponent>,
              public _dialog: MatDialog,
              private _commonTasksService: CommonTasksService,
              public _tasksService: TasksService,
              public _snackBar: MatSnackBar
  ) {

    this.taskFormGroup = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      completed: new FormControl(false, [Validators.required]),
    })
    this.initFormGroupForEdit();
  }

  public initFormGroupForEdit() {
    if (this.data) {
      this.titleControl.setValue(this.data.title);
      this.descriptionControl.setValue(this.data.description);
      this.completedControl.setValue(this.data.completed);
    }
  }

  public onSave() {
    if (this.taskFormGroup.invalid) return;
    this.loading = true;
    this.updateNote()

  }

  private updateNote() {
    this._tasksService.update({
      id: this.data!.id,
      ...this.taskFormGroup.value,
    }).subscribe(rs => {
      if (rs) {
        this._commonTasksService.fireTaskChangeEvent();
        this.loading = false;
        this._dialogRef.close(rs)
      }
    })
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


  onClose() {
    this._dialogRef.close(null)
  }

  public displayNotification(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    })
  }
}
