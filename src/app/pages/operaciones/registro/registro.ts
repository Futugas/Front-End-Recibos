import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Header } from "../../../shared/header/header";

@Component({
  selector: 'app-registro',
  imports: [Header, FormsModule],
  templateUrl: './registro.html',
})
export class Registro {

  router = inject(Router);

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

  continuar(): void {
    if (this.isFormValid()) {
      console.log('Operación guardada:', this.operacion);
      this.router.navigate(['/captura-lecturas']);
    }
  }

  regresar(): void {
    this.router.navigate(['/zona-area']);
  }

}
