import { Injectable } from '@angular/core';

import { LecturaData, LecturaTabla, OperacionData, ZonaData } from '../interfaces/store.interface';

@Injectable({ providedIn: 'root' })
export class StoreService {

  private zonaData: ZonaData | null = null;
  private operacionData: OperacionData | null = null;
  private lecturaData: LecturaData | null = null;
  private lecturaTabla: any;

  setZona(data: ZonaData): void {
    this.zonaData = data;
  }

  getZona(): ZonaData | null {
    return this.zonaData;
  }

  setLecturaTabla(data: any): void {
    this.lecturaTabla = data;
  }

  getLecturaTabla(): any | null {
    return this.lecturaTabla;
  }

  setOperacion(data: OperacionData): void {
    this.operacionData = data;
  }

  getOperacion(): OperacionData | null {
    return this.operacionData;
  }

  setLectura(data: LecturaData): void {
    this.lecturaData = data;
  }

  getLectura(): LecturaData | null {
    return this.lecturaData;
  }

  getRegistroCompleto() {
    return {
      zona: this.zonaData,
      operacion: this.operacionData,
      lectura: this.lecturaData
    };
  }

  reiniciar(): void {
    this.zonaData = null;
    this.operacionData = null;
    this.lecturaData = null;
  }

}
