import { User } from './../interfaces/user.interface';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environment.baseUrl;
  private user?: User;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  get currentUser(): User | undefined {
    if (!this.user) return undefined;

    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap((user) => (this.user = user)),
      tap((user) =>
        localStorage.setItem('token', 'ASl1i23hg3444kj34lj2KLHJK4L33')
      )
    );
  }

  checkAuthentication(): Observable<boolean> {
    if (isPlatformBrowser(this.platformId)) {
      if (!localStorage.getItem('token')) return of(false);

      const token = localStorage.getItem('token');

      return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
        tap((user) => (this.user = user)),
        map((user) => !!user),
        catchError(() => of(false))
      );
    } else {
      // Manejar el caso en que no esté disponible localStorage, por ejemplo, retornar un Observable de false
      return of(false);
    }
  }

  logout(): void {
    this.user = undefined;
    localStorage.clear();
  }
}
