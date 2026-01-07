// area-selector.component.ts
import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Header } from '../../../shared/header/header';

import { StoreService } from '../../services/store.service';
import { OperacionesService } from '../../services/operaciones.service';

import { Area, Zone } from '../../interfaces/operaciones.interface';

@Component({
  selector: 'app-area-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, Header],
  templateUrl: './zona-area.html',
})
export class ZonaArea implements OnInit {

  router = inject(Router);
  storeService = inject(StoreService);
  operacionesService = inject(OperacionesService);
  cdr = inject(ChangeDetectorRef);

  selectedZonaId: number | null = null;
  selectedAreaId: number | null = null;

  zonas: Zone[] = [];
  areasFiltradas: Area[] = [];

  isLoadingZonas = false;
  isLoadingAreas = false;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.cargarZonas();
  }

  cargarZonas(): void {
    this.isLoadingZonas = true;
    this.errorMessage = null;

    this.operacionesService.obtenerZonas().subscribe({
      next: (response) => {
        this.zonas = response.data;
        this.isLoadingZonas = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar zonas:', error);
        this.errorMessage = 'Error al cargar las zonas';
        this.isLoadingZonas = false;
        this.cdr.detectChanges();
      }
    });
  }

  cambioZona(event: any): void {
    this.selectedAreaId = null;
    this.areasFiltradas = [];

    if (!event) return;

    this.isLoadingAreas = true;
    this.errorMessage = null;

    this.operacionesService.obtenerAreasPorZona(event).subscribe({
      next: (response) => {
        this.areasFiltradas = response.data;
        this.isLoadingAreas = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar áreas:', error);
        this.errorMessage = 'Error al cargar las áreas';
        this.isLoadingAreas = false;
        this.cdr.detectChanges();
      }
    });
  }

  continuar(): void {
    if (!this.selectedZonaId || !this.selectedAreaId) {
      this.errorMessage = 'Debe seleccionar una zona y un área';
      return;
    }

    const zonaSeleccionada = this.zonas.find(z => z.id == this.selectedZonaId);
    const areaSeleccionada = this.areasFiltradas.find(a => a.id == this.selectedAreaId);

    if (zonaSeleccionada && areaSeleccionada) {
      this.router.navigate(['/registro']);
      this.storeService.setZona({
        zona: zonaSeleccionada,
        area: {
          id: areaSeleccionada.id,
          nombre: areaSeleccionada.nombre,
          zonaId: areaSeleccionada.zona_id
        }
      });
    }
  }

}
