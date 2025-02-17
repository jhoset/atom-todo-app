import {Injectable} from '@angular/core';
import {BehaviorSubject, map, switchMap, tap} from "rxjs";
import {TaskDto, TasksService} from "../../../core/services/tasks.service";

@Injectable({
  providedIn: 'root'
})
export class CommonTasksService {

  constructor(private _tasksService: TasksService) {
  }

  private taskChangeEventSubject = new BehaviorSubject<any>(null);
  public taskChangeEvent$ = this.taskChangeEventSubject.asObservable();

  public fireTaskChangeEvent() {
    this.taskChangeEventSubject.next('change');
  }

  public tasks$ = this.taskChangeEvent$.pipe(
    tap(() => console.log('Task change event fired')),
    switchMap(() => this._tasksService.getAll())
  );

}
