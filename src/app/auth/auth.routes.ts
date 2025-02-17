import {LoginComponent} from "./views/login/login.component";
import {Routes} from "@angular/router";

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login'
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
]
