import {Component, inject} from '@angular/core';
import {TaskDto, TasksService} from "../../../../core/services/tasks.service";
import {CurrentUserService} from "../../../../core/services/current-user.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {TasksUpdateComponent} from "../../components/tasks-update/tasks-update.component";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {CardItemComponent} from "../../components/card-item/card-item.component";
import {TasksCreationComponent} from "../../components/tasks-creation/tasks-creation.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatDivider} from "@angular/material/divider";
import {LoaderComponent} from "../../../../shared/loader/loader.component";
import {CommonTasksService} from "../../services/common-tasks.service";

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    MatIcon,
    MatIconButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatButton,
    CardItemComponent,
    FormsModule,
    MatFormField,
    MatInput,

    MatRadioButton,
    MatRadioGroup,
    ReactiveFormsModule,
    MatDivider,
    LoaderComponent,
    TasksCreationComponent
  ],
  templateUrl: './tasks-list.component.html',
})
export class TasksListComponent {

  private _commonTasksService = inject(CommonTasksService);
  public tasks$ = this._commonTasksService.tasks$;


  constructor(public _currentUserService: CurrentUserService,
              private _router: Router) {
  }



  onLogout() {
    localStorage.removeItem('eUser');
    this._currentUserService.setUser(null);
    this._router.navigate(['/auth/login'])
  }



}
