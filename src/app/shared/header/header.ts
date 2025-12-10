import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../pages/auth/services/auth.service';
import { User } from '../../pages/auth/interfaces/login-response.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
})
export class Header implements OnInit {

  readonly authService = inject(AuthService);
  readonly router = inject(Router);

  user: User | null = null;

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    const userData = localStorage.getItem('usuario');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/inicio-sesion']);
  }

}
