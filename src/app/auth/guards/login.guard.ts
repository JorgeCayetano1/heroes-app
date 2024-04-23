import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';

const checkLoginStatus = (): boolean | Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap((isAuthenticated) => {
      if (isAuthenticated) {
        router.navigate(['./']);
      }
    }),
    map((isAuthenticated) => !isAuthenticated)
  );
};

export const LoginCanMatchGuard: CanMatchFn = (route, segments) => {
  return checkLoginStatus();
};

export const LoginCanActivateGuard: CanActivateFn = (route, state) => {
  return checkLoginStatus();
};
