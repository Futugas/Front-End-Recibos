import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Header } from "../../../shared/header/header";

@Component({
  selector: 'app-captura-lecturas',
  imports: [Header, FormsModule],
  templateUrl: './captura-lecturas.html',
})
export class CapturaLecturas {

  router = inject(Router);

  lectura = {
    dia: null,
    mes: null,
    ano: null,
    lecturaAnterior: 0, // Se obtendría del último registro
    lecturaActual: null,
    precio: null,
    factorConversion: 6.997,
  };

  calcularConsumo(): number {
    if (this.lectura.lecturaActual && this.lectura.lecturaAnterior) {
      return this.lectura.lecturaActual - this.lectura.lecturaAnterior;
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
      console.log('Guardando lectura:', this.lectura);
      // Lógica para guardar
    }
  }

  regresar(): void {
    this.router.navigate(['/registro']);
  }

}
