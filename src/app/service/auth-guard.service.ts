import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  public async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    try {
      const user = await localStorage.getItem('users');

      if (!user) {
        this.router.navigate(['/login']);

        return false;
      }

      return true;
    } catch (error) {
      console.log('Auth guard error throw', error);
      return false;
    }
  }
}
