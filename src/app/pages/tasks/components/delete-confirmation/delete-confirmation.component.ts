import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {TaskDto, TasksService} from "../../../../core/services/tasks.service";
import {LoaderComponent} from "../../../../shared/loader/loader.component";
import {MatButton} from "@angular/material/button";
import {CommonTasksService} from "../../services/common-tasks.service";

@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    LoaderComponent,
    MatButton
  ],
  templateUrl: './delete-confirmation.component.html',
})
export class DeleteConfirmationComponent {
  public loading: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
              private _dialogRef: MatDialogRef<DeleteConfirmationComponent>,
              private _tasksService: TasksService,
              private _commonTasksService: CommonTasksService
  ) {
  }

  onConfirm() {
    this.loading = true;
    this._tasksService.delete(this.data).subscribe(rs => {
      this.loading = false;
      if (rs) {
        this._commonTasksService.fireTaskChangeEvent()
        this._dialogRef.close("OK");
      }
    })


  }

  onClose() {
    this._dialogRef.close(null)
  }
}
