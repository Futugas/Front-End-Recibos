import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { StoreService } from '../../services/store.service';
import { OperacionesService } from '../../services/operaciones.service';

import { Area, Zone, Edificio, Departamento } from '../../interfaces/operaciones.interface';
import { Header } from "../../../shared/header/header";

@Component({
  selector: 'app-zona-area-edificio-depto',
  standalone: true,
  imports: [Header, FormsModule],
  templateUrl: './zona-area-edificio-depto.html',
})
export class ZonaAreaEdificioDepto implements OnInit {

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
        this.errorMessage = 'Error al cargar las zonas';
        this.isLoadingZonas = false;
        this.cdr.detectChanges();
      }
    });
  }

  cambioZona(event: any): void {
    const id = Number(event);
    this.selectedAreaId = null;
    this.selectedEdificioId = null;
    this.selectedDepartamentoId = null;

    this.areasFiltradas = [];
    this.edificiosFiltrados = [];
    this.departamentosFiltrados = [];

    if (!id) return;

    this.isLoadingAreas = true;
    this.operacionesService.obtenerAreasPorZona(id).subscribe({
      next: (response) => {
        this.areasFiltradas = response.data;
        this.isLoadingAreas = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Error al cargar las áreas';
        this.isLoadingAreas = false;
        this.cdr.detectChanges();
      }
    });
  }

  cambioArea(event: any): void {
    const id = Number(event);
    this.selectedEdificioId = null;
    this.selectedDepartamentoId = null;

    this.edificiosFiltrados = [];
    this.departamentosFiltrados = [];

    if (!id) return;

    this.isLoadingEdificios = true;
    this.operacionesService.obtenerEdificiosPorArea(id).subscribe({
      next: (response) => {
        this.edificiosFiltrados = response.data;
        this.isLoadingEdificios = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Error al cargar los edificios';
        this.isLoadingEdificios = false;
        this.cdr.detectChanges();
      }
    });
  }

  cambioEdificio(event: any): void {
    const id = Number(event);
    this.selectedDepartamentoId = null;
    this.departamentosFiltrados = [];

    if (!id) return;

    this.isLoadingDepartamentos = true;
    this.operacionesService.obtenerDepartamentosPorEdificio(id).subscribe({
      next: (response) => {
        this.departamentosFiltrados = response.data;
        this.isLoadingDepartamentos = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Error al cargar los departamentos';
        this.isLoadingDepartamentos = false;
        this.cdr.detectChanges();
      }
    });
  }

  continuar(): void {
    if (!this.selectedZonaId || !this.selectedAreaId || !this.selectedEdificioId || !this.selectedDepartamentoId) {
      this.errorMessage = 'Debe completar todos los pasos de selección';
      return;
    }

    const zona = this.zonas.find(z => z.id == this.selectedZonaId);
    const area = this.areasFiltradas.find(a => a.id == this.selectedAreaId);
    const edificio = this.edificiosFiltrados.find(e => e.id == this.selectedEdificioId);
    const depto = this.departamentosFiltrados.find(d => d.id == this.selectedDepartamentoId);

    const fila = {
      zonaId: zona?.id,
      zona: zona?.nombre,
      areaId: area?.id,
      area: area?.nombre,
      edificioId: edificio?.id,
      edificio: edificio?.nombre,
      departamentoId: depto?.id,
      departamento: depto?.nombre
    };

    this.operacionesService.obtenerClientesJerarquiaCompleta(zona?.id!, area?.id!, edificio?.id!, depto?.id!).subscribe((res) => {
      const registro = res.data.find(r =>
        r.zona_id === fila.zonaId &&
        r.area_id === fila.areaId &&
        r.edificio_id === fila.edificioId &&
        r.departamento_id === fila.departamentoId
      );

      const filaFinal = {
        ...fila,
        ...registro
      };

      this.storeService.setLecturaTabla(filaFinal);
      this.router.navigate(['/resultados-lecturas']);
    });
  }

}
