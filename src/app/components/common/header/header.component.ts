import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  authStatusObservable: Observable<{
    isSignedIn: boolean;
    user: User;
  }>;

  authStatus = {
    isSignedIn: false as boolean,
    user: {
      username: '',
      id: '',
    } as User,
  };

  isOpen = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authStatusObservable = this.authService.getCurrentStatus();
    this.authStatusObservable.subscribe((status) => {
      this.authStatus = status;
    });
  }

  async ngOnInit() {}

  async getCurrentUser() {
    return await this.authService.getCurrentUser();
  }

  async isSignedIn() {
    return await this.authService.isSignedIn();
  }

  async signOutHandler() {
    await this.authService.signOut();
    this.router.navigate(['']);
    this.toggleMenu();
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
