import {Component, input} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatChipListbox, MatChipOption} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {TaskDto, TasksService} from "../../../../core/services/tasks.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TasksUpdateComponent} from "../tasks-update/tasks-update.component";
import {DeleteConfirmationComponent} from "../delete-confirmation/delete-confirmation.component";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatChipOption,
    MatChipListbox,
    MatCardActions,
    MatIcon,
    MatButton,
    MatTooltip,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    DatePipe
  ],
  templateUrl: './card-item.component.html',
})
export class CardItemComponent {
  task = input<TaskDto>();

  constructor(public _dialog: MatDialog,
              public _tasksService: TasksService,
              public _snackBar: MatSnackBar) {
  }

  onEdit() {
    const dialogRef = this._dialog.open(TasksUpdateComponent, {
      data: this.task(),
      width: '575px',
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.displayNotification('Success: Note Updated');
      }
    });
  }

  onDelete() {
    const dialogRef = this._dialog.open(DeleteConfirmationComponent, {
      data: this.task()!.id,
      width: '475px'
    })

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.displayNotification('Success: Note Deleted');
      }
    });
  }

  onArchive() {
    // this._tasksService.updateNoteStatus(this.note.id, false).subscribe(rs => {
    //   if (rs) {
    //     this.displayNotification('Success: Note Archived');
    //     this.note.isActive = false;
    //     this._super.updateActiveArchivedList()
    //   }
    // })
  }

  onUnArchive() {
    // this._tasksService.updateNoteStatus(this.note.id, true).subscribe(rs => {
    //   if (rs) {
    //     this.displayNotification('Success: Note Activated')
    //     this.note.isActive = true;
    //     this._super.updateActiveArchivedList()
    //   }
    // })
  }

  public displayNotification(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    })
  }
}
