export interface ZonaData {
  zona: any;
  area: any;
  edificio?: any;
  departamento?: any;
}

export interface OperacionData {
  concepto: string;
  nombre: string;
  cargo: string;
  estado: string;
}

export interface LecturaData {
  dia: string;
  mes: string;
  ano: string;
  lecturaAnt: number;
  lecturaActual: number;
  precio: number;
  factor: number;
}
