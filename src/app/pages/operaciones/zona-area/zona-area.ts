// area-selector.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Header } from '../../../shared/header/header';

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

  selectedZonaId: number | null = null;
  selectedAreaId: number | null = null;

  zonas: Zone[] = [];
  areas: Area[] = [];
  areasFiltradas: Area[] = [];

  ngOnInit(): void {
    // TODO: Cargar desde tu servicio
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

  onZonaChange(): void {
    this.selectedAreaId = null;
    this.areasFiltradas = this.areas.filter(
      area => area.zonaId === this.selectedZonaId
    );
  }

  getSelectedZonaNombre(): string {
    return this.zonas.find(z => z.id === this.selectedZonaId)?.nombre || '';
  }

  getSelectedAreaNombre(): string {
    return this.areasFiltradas.find(a => a.id === this.selectedAreaId)?.nombre || '';
  }

  handleContinue(): void {
    console.log('Zona:', this.selectedZonaId, 'Área:', this.selectedAreaId);
  }

}
