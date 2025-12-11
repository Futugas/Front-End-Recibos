// area-selector.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Header } from '../../../shared/header/header';

import { StoreService } from '../services/store.service';

interface Zone {
  id: number;
  nombre: string;
}

interface Area {
  id: number;
  nombre: string;
  zonaId: number;
}

@Component({
  selector: 'app-area-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, Header],
  templateUrl: './zona-area.html',
  styles: [`
    @keyframes fade-in {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-fade-in {
      animation: fade-in 0.3s ease-out;
    }

    select {
      background-image: none;
    }

    select:focus {
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
  `]
})
export class ZonaArea implements OnInit {

  router = inject(Router);
  storeService = inject(StoreService);

  selectedZonaId: number | null = null;
  selectedAreaId: number | null = null;

  zonas: Zone[] = [];
  areas: Area[] = [];
  areasFiltradas: Area[] = [];

  ngOnInit(): void {
    this.zonas = [
      { id: 1, nombre: 'Poniente' },
      { id: 2, nombre: 'Norte' },
      { id: 3, nombre: 'Centro' },
      { id: 4, nombre: 'Oriente' }
    ];

    this.areas = [
      { id: 1, nombre: 'A-H', zonaId: 1 },
      { id: 2, nombre: 'C1', zonaId: 2 },
      { id: 3, nombre: 'B1', zonaId: 3 },
      { id: 4, nombre: 'D1', zonaId: 4 }
    ];
  }

  cambioZona(event: any): void {
    this.selectedAreaId = null;
    this.areasFiltradas = this.areas.filter((f) => f.zonaId == event)
  }

  continuar(): void {
    const zonaSeleccionada = this.zonas.find(z => z.id == this.selectedZonaId);
    const areaSeleccionada = this.areas.find(a => a.id == this.selectedAreaId);

    this.router.navigate(['/registro']);
    this.storeService.setZona({zona: zonaSeleccionada, area: areaSeleccionada});
  }

}
