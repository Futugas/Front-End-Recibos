import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Header } from '../../../shared/header/header';

import { StoreService } from '../services/store.service';
import { OperacionesService } from '../services/operaciones.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [Header, FormsModule, CommonModule],
  templateUrl: './registro.html',
})
export class Registro implements OnInit {

  router = inject(Router);
  storeService = inject(StoreService);
  operacionesService = inject(OperacionesService);
  cdr = inject(ChangeDetectorRef);

  operacion = {
    concepto: '',
    nombre: '',
    cargo: '',
    estado: '',
  };

  zonaId: number = 0;
  areaId: number = 0;

  clientes: Array<{ nombre: string; referencia: string }> = [];
  buscarTermino: string = '';

  ngOnInit(): void {
    const datosZona = this.storeService.getZona();

    if (!datosZona) {
      this.router.navigate(['/zona-area']);
      return;
    }

    this.zonaId = datosZona.zona.id;
    this.areaId = datosZona.area.id;

    this.cargarClientes();
  }

  get clientesFiltrados() {
    if (!this.buscarTermino) {
      return this.clientes;
    }

    const search = this.buscarTermino.toLowerCase();

    return this.clientes.filter(c =>
      c.nombre.toLowerCase().includes(search) ||
      c.referencia.toLowerCase().includes(search)
    );
  }

  limpiarBusqueda(): void {
    this.buscarTermino = '';
  }

  cargarClientes(): void {
    this.operacionesService
      .obtenerClientePorZonaArea(this.zonaId, this.areaId)
      .subscribe({
        next: (resp) => {
          this.clientes = resp.data;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error al obtener clientes:', error);
          this.cdr.detectChanges();
        }
      });
  }

  isFormValid(): boolean {
    return !!(
      this.operacion.concepto &&
      this.operacion.nombre &&
      this.operacion.cargo &&
      this.operacion.estado
    );
  }

  continuar(): void {
    if (this.isFormValid()) {
      this.storeService.setOperacion(this.operacion);
      this.router.navigate(['/captura-lecturas']);
    }
  }

  regresar(): void {
    this.router.navigate(['/zona-area']);
  }

}
