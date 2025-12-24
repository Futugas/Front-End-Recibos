import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { StoreService } from '../../services/store.service';
import { OperacionesService } from '../../services/operaciones.service';

import { Area, Zone, Edificio, Departamento } from '../../interfaces/operaciones.interface';

import { Header } from "../../../shared/header/header";

@Component({
  selector: 'app-zona-area-edificio-depto',
  imports: [Header, FormsModule],
  templateUrl: './zona-area-edificio-depto.html',
})
export class ZonaAreaEdificioDepto {

  router = inject(Router);
  storeService = inject(StoreService);
  operacionesService = inject(OperacionesService);
  cdr = inject(ChangeDetectorRef);

  selectedZonaId: number | null = null;
  selectedAreaId: number | null = null;
  selectedEdificioId: number | null = null;
  selectedDepartamentoId: number | null = null;

  zonas: Zone[] = [];
  areasFiltradas: Area[] = [];
  edificiosFiltrados: Edificio[] = [];
  departamentosFiltrados: Departamento[] = [];

  isLoadingZonas = false;
  isLoadingAreas = false;
  isLoadingEdificios = false;
  isLoadingDepartamentos = false;
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
    // Resetear selecciones posteriores
    this.selectedAreaId = null;
    this.selectedEdificioId = null;
    this.selectedDepartamentoId = null;

    this.areasFiltradas = [];
    this.edificiosFiltrados = [];
    this.departamentosFiltrados = [];

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

  cambioArea(event: any): void {
    // Resetear selecciones posteriores
    this.selectedEdificioId = null;
    this.selectedDepartamentoId = null;

    this.edificiosFiltrados = [];
    this.departamentosFiltrados = [];

    if (!event) return;

    this.isLoadingEdificios = true;
    this.errorMessage = null;

    // this.operacionesService.obtenerEdificiosPorArea(event).subscribe({
    //   next: (response) => {
    //     this.edificiosFiltrados = response.data;
    //     this.isLoadingEdificios = false;
    //     this.cdr.detectChanges();
    //   },
    //   error: (error) => {
    //     console.error('Error al cargar edificios:', error);
    //     this.errorMessage = 'Error al cargar los edificios';
    //     this.isLoadingEdificios = false;
    //     this.cdr.detectChanges();
    //   }
    // });
  }

  cambioEdificio(event: any): void {
    // Resetear selección posterior
    this.selectedDepartamentoId = null;
    this.departamentosFiltrados = [];

    if (!event) return;

    this.isLoadingDepartamentos = true;
    this.errorMessage = null;

    // this.operacionesService.obtenerDepartamentosPorEdificio(event).subscribe({
    //   next: (response) => {
    //     this.departamentosFiltrados = response.data;
    //     this.isLoadingDepartamentos = false;
    //     this.cdr.detectChanges();
    //   },
    //   error: (error) => {
    //     console.error('Error al cargar departamentos:', error);
    //     this.errorMessage = 'Error al cargar los departamentos';
    //     this.isLoadingDepartamentos = false;
    //     this.cdr.detectChanges();
    //   }
    // });
  }

  continuar(): void {
    if (!this.selectedZonaId || !this.selectedAreaId || !this.selectedEdificioId || !this.selectedDepartamentoId) {
      this.errorMessage = 'Debe completar todos los pasos';
      return;
    }

    const zonaSeleccionada = this.zonas.find(z => z.id == this.selectedZonaId);
    const areaSeleccionada = this.areasFiltradas.find(a => a.id == this.selectedAreaId);
    const edificioSeleccionado = this.edificiosFiltrados.find(e => e.id == this.selectedEdificioId);
    const departamentoSeleccionado = this.departamentosFiltrados.find(d => d.id == this.selectedDepartamentoId);

    console.log({
      zona: zonaSeleccionada,
      area: areaSeleccionada,
      edificio: edificioSeleccionado,
      departamento: departamentoSeleccionado
    });

    if (zonaSeleccionada && areaSeleccionada && edificioSeleccionado && departamentoSeleccionado) {
      this.router.navigate(['/registro']);
      this.storeService.setZona({
        zona: zonaSeleccionada,
        area: {
          id: areaSeleccionada.id,
          nombre: areaSeleccionada.nombre,
          zonaId: areaSeleccionada.zona_id
        },
        // edificio: {
        //   id: edificioSeleccionado.id,
        //   nombre: edificioSeleccionado.nombre,
        //   areaId: edificioSeleccionado.area_id
        // },
        // departamento: {
        //   id: departamentoSeleccionado.id,
        //   nombre: departamentoSeleccionado.nombre,
        //   edificioId: departamentoSeleccionado.edificio_id
        // }
      });
    }
  }

}
