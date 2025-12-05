import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, tap } from 'rxjs';

import { LoginResponse } from '../interfaces/login-response.interface';

interface RegisterResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:5000/api/auth';
  private authState = new BehaviorSubject<boolean>(this.hasToken());

  authState$ = this.authState.asObservable();

  constructor(private http: HttpClient) {}

  // -------------------------------
  //   CODIFICAR CONTRASEÑA
  // -------------------------------
  private encodePassword(password: string): string {
    const salt = 'recibosApp2025_';
    const combined = salt + password + salt;
    return btoa(combined); // Base64 encode
  }

  // -------------------------------
  //           REGISTRO
  // -------------------------------
  register(nombre: string, email: string, password: string): Observable<RegisterResponse> {
    const encodedPassword = this.encodePassword(password);

    return this.http.post<RegisterResponse>(
      `${this.apiUrl}/registrar`,
      {
        nombre,
        email,
        password: encodedPassword
      }
    );
  }

  // -------------------------------
  //           LOGIN
  // -------------------------------
  login(email: string, password: string): Observable<LoginResponse> {
    const encodedPassword = this.encodePassword(password);

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/iniciar-sesion`,
      {
        email,
        password: encodedPassword
      }
    ).pipe(
      tap(res => {
        if (res.data?.token) {
          this.setToken(res.data.token);
          this.authState.next(true);
        }
      })
    );
  }

  // -------------------------------
  //           LOGOUT
  // -------------------------------
  logout(): void {
    localStorage.removeItem('token');
    this.authState.next(false);
  }

  // -------------------------------
  //   OBTENER TOKEN PARA PETICIONES
  // -------------------------------
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // -------------------------------
  //      VALIDAR SI ESTÁ LOGEADO
  // -------------------------------
  isAuthenticated(): boolean {
    return this.hasToken();
  }

  // -------------------------------
  //  OBTENER DATOS DEL USUARIO (OPCIONAL)
  // -------------------------------
  getUserData(): { id: number; nombre: string; email: string } | null {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  // -------------------------------
  //  MÉTODOS PRIVADOS DE APOYO
  // -------------------------------
  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

}
