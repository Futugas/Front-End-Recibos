import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Header } from "../../../shared/header/header";

import { LecturaData } from '../../interfaces/store.interface';

import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-captura-lecturas',
  imports: [Header, FormsModule],
  templateUrl: './captura-lecturas.html',
})
export class CapturaLecturas {

  router = inject(Router);
  storeService = inject(StoreService);

  lectura: LecturaData = {
    dia: '',
    mes: '',
    ano: '',
    lecturaAnt: 0, // Se obtendría del último registro
    lecturaActual: 0,
    precio: 0,
    factor: 6.997,
  };

  calcularConsumo(): number {
    if (this.lectura.lecturaActual && this.lectura.lecturaAnt) {
      return this.lectura.lecturaActual - this.lectura.lecturaAnt;
    }
    return 0;
  }

  calcularPrecio() {
    // Aquí puedes calcular el precio basado en el consumo
    const consumo = this.calcularConsumo();
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

  generarRecibo() {
    if (this.isFormValid()) {
      this.storeService.setLectura(this.lectura);
      console.log(this.storeService.getRegistroCompleto());
    }
  }

  regresar(): void {
    this.router.navigate(['/registro']);
  }

}
