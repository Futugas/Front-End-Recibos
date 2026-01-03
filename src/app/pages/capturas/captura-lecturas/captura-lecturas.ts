import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Header } from "../../../shared/header/header";

import { LecturaData } from '../../interfaces/store.interface';

import { StoreService } from '../../services/store.service';
import { OperacionesService } from '../../services/operaciones.service';

@Component({
  selector: 'app-captura-lecturas',
  imports: [Header, FormsModule],
  templateUrl: './captura-lecturas.html',
})
export class CapturaLecturas implements OnInit {

  router = inject(Router);
  storeService = inject(StoreService);
  operacionesService = inject(OperacionesService);
  cdr = inject(ChangeDetectorRef);

  lectura: LecturaData = {
    id: 0,
    dia: '',
    mes: '',
    ano: '',
    lecturaAnterior: 0,
    lecturaActual: 0,
    precio: 0,
    factor: 0,
  };

  mostrarModal = false;
  modalMensaje = '';
  modalTipo: 'success' | 'error' = 'success';

  data: any;
  cargo: number = 0;

  ngOnInit(): void {
    this.data = this.storeService.getLecturaTabla();

    this.lectura.lecturaAnterior = this.data.lectura_anterior;
    this.lectura.factor = this.data.factor ?? 6.997;

    this.operacionesService.obtenerClientePorId(this.data.id).subscribe({
      next: (cliente) => {
        this.cargo = cliente.data.cargo;
      }
    })
  }

  // calcularConsumo(): number {
  //   if (this.lectura.lecturaActual && this.lectura.lecturaAnterior) {
  //     return this.lectura.lecturaActual - this.lectura.lecturaAnterior;
  //   }
  //   return 0;
  // }

  calcularPrecio() {
    // Aquí puedes calcular el precio basado en el consumo
    // const consumo = this.calcularConsumo();
    // Lógica de cálculo de precio
  }

  privateisFormValid(): boolean {
    return !!(
      this.lectura.dia &&
      this.lectura.mes &&
      this.lectura.ano &&
      this.lectura.lecturaActual &&
      this.lectura.precio
    );
  }

  actualizar(): void {
    const payload: any = {
      id: this.data.id,
    };

    if (this.lectura?.precio != 0) {
      payload.precio = Number(this.lectura.precio);
    }

    if (this.lectura?.ano && this.lectura?.mes && this.lectura?.dia) {
      payload.fecha = `${this.lectura.ano}-${String(this.lectura.mes).padStart(2, '0')}-${String(this.lectura.dia).padStart(2, '0')}`;
    }

    if (this.lectura?.lecturaActual != null) {
      payload.lectura_actual = Number(this.lectura.lecturaActual);
    }

    this.storeService.setLecturaTabla({
      ...this.storeService.getLecturaTabla(),
      cargo: this.cargo,
      lectura_anterior: this.lectura.lecturaActual ?? this.storeService.getLecturaTabla()?.lectura_anterior,
      precio: this.lectura.precio,
    });

    this.operacionesService.actualizarCliente(payload).subscribe({
      next: () => {
        localStorage.setItem('lectura', this.lectura.lecturaActual.toString());
        localStorage.setItem('lecturaAnt', this.lectura.lecturaAnterior.toString());
        this.abrirModal('Se actualizó el cliente correctamente', 'success');
      },
      error: err => {
        console.error(err);
        this.abrirModal('Error al actualizar el cliente', 'error');
      }
    });
  }


  regresar(): void {
    this.router.navigate(['/zona-area-edificio-depto']);
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

  generarRecibo(): void {
    this.router.navigate(['/generar-recibo']);
  }

}
