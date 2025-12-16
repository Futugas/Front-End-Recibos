import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ApiResponse, Area, Zone } from '../interfaces/operaciones.interface';

@Injectable({
  providedIn: 'root',
})
export class OperacionesService {

  url = environment.urlBackEnd;
  http = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  obtenerZonas(): Observable<ApiResponse<Zone[]>> {
    return this.http.get<ApiResponse<Zone[]>>(`${this.url}/zonas`, {
      headers: this.getHeaders()
    });
  }

  obtenerAreasPorZona(zonaId: number): Observable<ApiResponse<Area[]>> {
    return this.http.get<ApiResponse<Area[]>>(`${this.url}/zonas/${zonaId}/areas`, {
      headers: this.getHeaders()
    });
  }

}
