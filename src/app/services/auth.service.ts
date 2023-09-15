// auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private userRole: string | null = null;

  constructor(private router: Router) { }

  // Simulate a login with a user role.
  login(username: string, password: string) {
    // check user on its authenticated base role
    if (username === 'admin' && password === 'admin') {
      this.isAuthenticated = true;
      this.userRole = 'admin';
      this.redirectToAdmin();
    } else if (username === 'user' && password === 'user') {
      this.isAuthenticated = true;
      this.userRole = 'user';
      this.redirectToUser();
    } else {
      this.isAuthenticated = false;
      this.userRole = null;
    }
  }

  redirectToAdmin() {
    console.log('admin');
    this.router.navigate(['/admin']);
  }

  redirectToUser() {
    console.log('user');
    this.router.navigate(['/user']);
  }


  // Logout the user.
  logout() {
    this.isAuthenticated = false;
    this.userRole = null;
    this.router.navigate(['/login']);
  }

  // Check if the user is authenticated.
  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  // Get the user's role.
  getUserRole(): string | null {
    return this.userRole;
  }

  isUserAdmin(): boolean {
    return this.isAuthenticated && this.userRole === 'admin';
  }
  isUser(): boolean {
    return this.isAuthenticated && this.userRole === 'user';
  }
}
