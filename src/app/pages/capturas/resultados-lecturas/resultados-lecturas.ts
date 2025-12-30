import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Header } from '../../../shared/header/header';

import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [Header, FormsModule, CommonModule],
  templateUrl: './resultados-lecturas.html',
})
export class ResultadosLecturas implements OnInit {

  router = inject(Router);
  storeService = inject(StoreService);
  cdr = inject(ChangeDetectorRef);

  datos: any[] = [];

  ngOnInit(): void {
    const datosZona = this.storeService.getLecturaTabla();
    this.datos = [datosZona];
  }

  ver(): void {
    this.router.navigate(['/captura-lecturas']);
  }

  regresar(): void {
    this.router.navigate(['/zona-area-edificio-depto']);
  }

}
