import { Component } from '@angular/core';
import { Header } from "../../../shared/header/header";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  imports: [Header, FormsModule],
  templateUrl: './registro.html',
})
export class Registro {

  operacion = {
    concepto: '',
    nombre: '',
    cargo: '',
    estado: '',
  };

  isFormValid(): boolean {
    return !!(
      this.operacion.concepto &&
      this.operacion.nombre &&
      this.operacion.cargo &&
      this.operacion.estado
    );
  }

  handleSubmit() {
    if (this.isFormValid()) {
      // Lógica para guardar
      console.log('Operación guardada:', this.operacion);
    }
  }

  handleBack() {
    // Lógica para volver a la pantalla anterior
  }

}
