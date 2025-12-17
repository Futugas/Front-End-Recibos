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
  area_id: number;
  codigo_postal: string;
  direccion: string;
  id: number;
  nombre: string;
  referencia: string;
  zona_id: number;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}
