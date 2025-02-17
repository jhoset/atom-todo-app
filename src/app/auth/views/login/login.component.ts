import {Component} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardHeader} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {UsersService} from "../../../core/services/users.service";
import {CurrentUserService} from "../../../core/services/current-user.service";
import {Router} from "@angular/router";
import {CustomValidators} from "../../validators/custom-validators";
import {LoaderComponent} from "../../../shared/loader/loader.component";
import {MatButton} from "@angular/material/button";
import {TasksCreationComponent} from "../../../pages/tasks/components/tasks-creation/tasks-creation.component";
import {MatDialog} from "@angular/material/dialog";
import {RegisterComponent} from "../register/register.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardFooter,
    MatCardActions,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    LoaderComponent,
    MatButton,
    MatLabel,
    FormsModule
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public loading: boolean = false;

  public loginFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, CustomValidators.emailPatternValidator()]),
  })

  constructor(private _usersService: UsersService,
              private _currentUserService: CurrentUserService,
              private _router: Router,
              public _dialog: MatDialog) {
  }

  public get emailControl(): FormControl {
    return this.loginFormGroup.get('email') as FormControl;
  }

  onLogin() {
    this.loading = true;
    this._usersService.getByEmail(this.loginFormGroup.value.email!).subscribe((rs: any) => {
      if (rs && rs?.id) {
        this.loading = false;
        localStorage.setItem('eUser', JSON.stringify(rs));
        this._currentUserService.setUser(rs);
        this._router.navigate(['/tasks']);
      }
    }, (error: any) => {
      this.loading = false;
      if (error.status === 401) {
        this.createNewUser()
      }
    });
  }

  createNewUser() {
    const dialogRef = this._dialog.open(RegisterComponent, {
      data: this.emailControl.value,
      width: '575px'
    })

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.displayNotification('Success: Task Created');
    //   }
    // });
  }

}
