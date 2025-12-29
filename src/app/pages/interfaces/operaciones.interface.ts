export interface Zone {
  id: number;
  nombre: string;
}

export interface Area {
  id: number;
  nombre: string;
  zona_id: number;
}

export interface Cliente {
  id: number;
  referencia: string;
  nombre: string;
  direccion: string;
  codigo_postal: string | null;
  zona_id: number;
  area_id: number;
  edificio_id: number;
  departamento_id: number;
  cargo: number;
  estado: string;
  lectura_anterior: number;
  factor: number;
  precio: number;
  fecha: string;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface Edificio {
  id: number;
  nombre: string;
  area_id: number;
}

export interface Departamento {
  id: number;
  nombre: string;
  edificio_id: number;
}
