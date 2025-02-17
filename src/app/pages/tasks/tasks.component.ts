import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {CurrentUserService} from "../../core/services/current-user.service";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './tasks.component.html',
})
export class TasksComponent {
  constructor(private _currentUser: CurrentUserService) {
    const user = localStorage.getItem('eUser');
    if (user) {
      this._currentUser.setUser(JSON.parse(user));
    } else {
      this._currentUser.setUser({email: 'unknown@gmail.com'});
    }
  }
}
