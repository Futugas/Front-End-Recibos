import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Header } from '../../../shared/header/header';

import { StoreService } from '../services/store.service';
import { OperacionesService } from '../services/operaciones.service';

import { Cliente } from '../interfaces/operaciones.interface';

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

  zonaId = 0;
  areaId = 0;

  clientes: Cliente[] = [];
  buscarTermino = '';

  mostrarModal = false;
  modalMensaje = '';
  modalTipo: 'success' | 'error' = 'success';

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
    if (!this.buscarTermino) return this.clientes;

    const search = this.buscarTermino.toLowerCase();
    return this.clientes.filter(c =>
      c.nombre.toLowerCase().includes(search) ||
      c.referencia.toLowerCase().includes(search)
    );
  }

  cargarClientes(): void {
    this.operacionesService
      .obtenerClientePorZonaArea(this.zonaId, this.areaId)
      .subscribe({
        next: (resp) => {
          this.clientes = resp.data;
          this.cdr.detectChanges();
        },
        error: () => {
          this.abrirModal('Error al obtener clientes', 'error');
        }
      });
  }

  limpiarBusqueda(): void {
    this.buscarTermino = '';
  }

  guardarCliente(cliente: Cliente): void {
    this.operacionesService.actualizarCliente(cliente).subscribe({
      next: () => {
        this.abrirModal('Cliente actualizado correctamente', 'success');
      },
      error: () => {
        this.abrirModal('Error al actualizar el cliente', 'error');
      }
    });
  }

  abrirModal(mensaje: string, tipo: 'success' | 'error'): void {
    this.modalMensaje = mensaje;
    this.modalTipo = tipo;
    this.mostrarModal = true;
    this.cdr.detectChanges();
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  isFormValid(): boolean {
    return !!(
      this.operacion.concepto &&
      this.operacion.nombre &&
      this.operacion.cargo &&
      this.operacion.estado
    );
  }

  regresar(): void {
    this.router.navigate(['/zona-area']);
  }

}
