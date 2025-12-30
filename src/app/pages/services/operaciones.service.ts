import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
// Asegúrate de agregar Edificio y Departamento a tus interfaces
import { ApiResponse, Area, Cliente, Zone, Edificio, Departamento } from '../interfaces/operaciones.interface';

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

  // --- NUEVOS MÉTODOS PARA LA CASCADA ---

  obtenerEdificiosPorArea(areaId: number): Observable<ApiResponse<Edificio[]>> {
    return this.http.get<ApiResponse<Edificio[]>>(`${this.url}/zonas/areas/${areaId}/edificios`, {
      headers: this.getHeaders()
    });
  }

  obtenerDepartamentosPorEdificio(edificioId: number): Observable<ApiResponse<Departamento[]>> {
    return this.http.get<ApiResponse<Departamento[]>>(`${this.url}/zonas/edificios/${edificioId}/departamentos`, {
      headers: this.getHeaders()
    });
  }

  // ---------------------------------------

  // Actualizado para filtrar hasta el nivel de departamento si es necesario
  obtenerClientePorZonaArea(zonaId: number, areaId: number): Observable<ApiResponse<Cliente[]>> {
    return this.http.get<ApiResponse<Cliente[]>>(`${this.url}/clientes/por-zona-area/${zonaId}/${areaId}`, {
      headers: this.getHeaders()
    });
  }

  // Nuevo método para obtener clientes específicos de un departamento
  obtenerClientesPorDepartamento(deptoId: number): Observable<ApiResponse<Cliente[]>> {
    return this.http.get<ApiResponse<Cliente[]>>(`${this.url}/clientes/buscar?depto_id=${deptoId}`, {
      headers: this.getHeaders()
    });
  }

  actualizarCliente(cliente: any): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.url}/clientes/${cliente.id}`, cliente, {
      headers: this.getHeaders()
    });
  }

  obtenerClientesJerarquiaCompleta(zId: number, aId: number, eId: number, dId: number): Observable<ApiResponse<Cliente[]>> {
    return this.http.get<ApiResponse<Cliente[]>>(
      `${this.url}/clientes/por-jerarquia-completa/${zId}/${aId}/${eId}/${dId}`,
      { headers: this.getHeaders() }
    );
  }

}
