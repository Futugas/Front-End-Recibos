import { Component } from '@angular/core';
import { Header } from "../../../shared/header/header";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-captura-lecturas',
  imports: [Header, FormsModule],
  templateUrl: './captura-lecturas.html',
})
export class CapturaLecturas {

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

  handleGuardar() {
    if (this.isFormValid()) {
      console.log('Guardando lectura:', this.lectura);
      // Lógica para guardar
    }
  }

  handleModificar() {
    console.log('Modificar lectura');
    // Lógica para modificar
  }

  handleSalir() {
    console.log('Salir');
    // Lógica para salir
  }

  handleSubmit() {

  }

}
