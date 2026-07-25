import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Hardcoded for now — toggle to test
  isLoggedIn = false;

  login() { this.isLoggedIn = true; }
  logout() { this.isLoggedIn = false; }
}
