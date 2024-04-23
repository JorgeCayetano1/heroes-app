import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

const checkAuthStatus = (): boolean | Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['./auth/login']);
      }
    })
  );
};

export const authCanMatchGuard: CanMatchFn = (route, segments) => {
  // console.log('cantMatch', { route, segments });
  return checkAuthStatus();
};

export const authCanActivateGuard: CanActivateFn = (route, state) => {
  // console.log('cantActivate', { route, state });
  return checkAuthStatus();
};
