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
  id: number;
  dia: string;
  mes: string;
  ano: string;
  lecturaAnt: number;
  lecturaActual: number;
  precio: number;
  factor: number;
}

export interface LecturaTabla {
  zonaId: number;
  zona: string;
  areaId: number;
  area: string;
  edificioId: number;
  edificio: string;
  departamentoId: number;
  departamento: string;
  lecturaAnterior: number;
}
