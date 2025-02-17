import {Routes} from '@angular/router';
import {loginGuard} from "./core/guards/login.guard";
import {authGuard} from "./core/guards/auth.guard";

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes')
      .then(m => m.AUTH_ROUTES),
    canActivate: [loginGuard]
  },
  {
    path: '',
    loadChildren: () => import('./pages/tasks/tasks.routes')
      .then(m => m.TASKS_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: '**', redirectTo: 'auth', pathMatch: 'full'
  }
];
