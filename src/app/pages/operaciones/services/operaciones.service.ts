import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ApiResponse, Area, Cliente, Zone } from '../interfaces/operaciones.interface';

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

  obtenerClientePorZonaArea(zonaId: number, areaId: number): Observable<ApiResponse<Cliente[]>> {
    return this.http.get<ApiResponse<Cliente[]>>(`${this.url}/clientes/por-zona-area/${zonaId}/${areaId}`, {
      headers: this.getHeaders()
    });
  }

  actualizarCliente(cliente: Cliente): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.url}/clientes/${cliente.id}`, cliente, {
      headers: this.getHeaders()
    });
  }

}
