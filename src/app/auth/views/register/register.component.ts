import {Component, Inject} from '@angular/core';
import {LoaderComponent} from "../../../shared/loader/loader.component";
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {TaskDto, TasksService} from "../../../core/services/tasks.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CustomValidators} from "../../validators/custom-validators";
import {UsersService} from "../../../core/services/users.service";
import {CurrentUserService} from "../../../core/services/current-user.service";
import {Router} from "@angular/router";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    LoaderComponent,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  public loading: boolean = false;

  public loginFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, CustomValidators.emailPatternValidator()]),
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
              private _dialogRef: MatDialogRef<RegisterComponent>,
              private _currentUserService: CurrentUserService,
              private _router: Router,
              private _usersService: UsersService
  ) {
    this.emailControl.setValue(data)
  }

  public get emailControl(): FormControl {
    return this.loginFormGroup.get('email') as FormControl;
  }


  onRegister() {
    this.loading = true;
    this._usersService.createUser({ email: this.loginFormGroup.value.email! }).subscribe((rs: any) => {
      this.loading = false;
      if (rs) {
        this._dialogRef.close("OK");
        localStorage.setItem('eUser', JSON.stringify(rs));
        this._currentUserService.setUser(rs);
        this._router.navigate(['/tasks']);
      }
    }, (error: any) => {
      this.loading = false;
    })


  }

  onClose() {
    this._dialogRef.close(null)
  }
}
