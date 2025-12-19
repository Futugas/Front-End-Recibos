import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { expiroJwt } from '../helpers/token';

export const authGuard: CanActivateFn = (): boolean => {
  const router = inject(Router);

  const token = localStorage.getItem('token');

  if (!token || expiroJwt(token)) {
    localStorage.removeItem('token');
    router.navigate(['/inicio-sesion']);
    return false;
  }

  return true;
};
