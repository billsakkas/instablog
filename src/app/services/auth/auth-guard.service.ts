import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(public auth: AuthService, public router: Router) {}
  async canActivate(): Promise<boolean> {
    if (!(await this.auth.isSignedIn())) {
      this.router.navigate(['auth/signin']);
      return false;
    }
    return true;
  }
}
