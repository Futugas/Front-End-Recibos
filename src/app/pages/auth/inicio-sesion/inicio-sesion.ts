import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-inicio-sesion',
  imports: [CommonModule, FormsModule],
  templateUrl: './inicio-sesion.html',
})
export class InicioSesion {

  usuario: string = '';
  contrasena: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  iniciarSesion(): void {
    this.errorMessage = '';
    this.isLoading = true;
    this.cdr.detectChanges();

    this.authService.login(this.usuario, this.contrasena).subscribe({
      next: (res): void => {
        if (res.status == 200) {
          localStorage.setItem('usuario', JSON.stringify(res.data.user));
          this.isLoading = false;
          this.cdr.detectChanges();
          this.router.navigate(['/zona-area']);
        }
      },
      error: (err): void => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Credenciales incorrectas';
        this.cdr.detectChanges();
      }
    });
  }

}
