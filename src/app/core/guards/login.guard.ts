import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (localStorage.getItem('eUser')) {
    router.navigate(['/tasks']);
    return false;
  }
  return true;
};
