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
    lecturaAnt: 0,
    lecturaActual: 0,
    precio: 0,
    factor: 6.997,
  };

  mostrarModal = false;
  modalMensaje = '';
  modalTipo: 'success' | 'error' = 'success';

  data: any;

  ngOnInit(): void {
    this.data = this.storeService.getLecturaTabla();
    console.log('Data', this.data)

    this.lectura.lecturaAnt = this.data.lectura_anterior;
    this.lectura.factor = this.data.factor ?? 6.997;
  }

  // calcularConsumo(): number {
  //   if (this.lectura.lecturaActual && this.lectura.lecturaAnt) {
  //     return this.lectura.lecturaActual - this.lectura.lecturaAnt;
  //   }
  //   return 0;
  // }

  calcularPrecio() {
    // Aquí puedes calcular el precio basado en el consumo
    // const consumo = this.calcularConsumo();
    // Lógica de cálculo de precio
  }

  isFormValid(): boolean {
    return !!(
      this.lectura.dia &&
      this.lectura.mes &&
      this.lectura.ano &&
      this.lectura.lecturaActual &&
      this.lectura.precio
    );
  }

  actualizar(): void {
    if (!this.isFormValid()) return;

    const payload = {
      id: this.data.id,
      precio: this.lectura.precio,
      fecha: `${this.lectura.ano}-${this.lectura.mes}-${this.lectura.dia}`,
      lectura_actual: this.lectura.lecturaActual
    };

    this.operacionesService.actualizarCliente(payload).subscribe({
      next: () => {
        this.abrirModal('Se actualizo el cliente correctamente', 'success');
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

}
