// admin-guard.service.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // Check if the user is an admin or user based on their role.
    if (this.authService.isUserAdmin()) {
      return true; // Allow access to the route for admins.
    } else if (this.authService.isUser()) {
      return true; // Redirect or deny access for non-admin users.
    } else {
      this.router.navigate(['/login']);
      return false;

    }
  }
}
