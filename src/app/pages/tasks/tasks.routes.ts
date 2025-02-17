import {Routes} from "@angular/router";
import {TasksComponent} from "./tasks.component";
import {TasksListComponent} from "./views/tasks-list/tasks-list.component";

export const TASKS_ROUTES: Routes = [
  {
    path: '',
    component: TasksComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: TasksListComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
