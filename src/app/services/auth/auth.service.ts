import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { User } from 'src/app/interfaces/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  status = new BehaviorSubject({
    isSignedIn: false as boolean,
    user: {
      username: '',
      id: '',
    } as User,
  });

  getCurrentStatus(): Observable<{ isSignedIn: boolean; user: User }> {
    return this.status.asObservable();
  }

  async signIn(username: string, password: string) {
    console.log('signing in');

    try {
      const user = await Parse.User.logIn(username, password);
      this.status.next({
        isSignedIn: true,
        user: {
          username: user.attributes['username'],
          id: user.id,
        },
      });
      return true;
    } catch (error) {
      console.error('Error while signing in user', error);
    }
    return false;
  }

  async signOut() {
    await Parse.User.logOut();
    this.status.next({
      isSignedIn: false,
      user: {
        username: '',
        id: '',
      },
    });
    console.log('signed out');
  }

  getCurrentUser() {
    const currentUser = Parse.User.current();
    if (!currentUser) return null;
    const user = {
      username: currentUser.attributes['username'],
      id: currentUser.id,
    } as User;

    return user;
  }

  async isSignedIn() {
    return (await this.getCurrentUser()) ? true : false;
  }

  constructor() {
    const currentUser = this.getCurrentUser();
    console.log('currentUser', currentUser);

    if (!currentUser) {
      this.status.next({ isSignedIn: false, user: { id: '', username: '' } });
      return;
    }

    this.status.next({
      isSignedIn: true,
      user: currentUser,
    });

    console.log('currentStatus', this.status.value);
  }
}
