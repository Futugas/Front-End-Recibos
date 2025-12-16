export interface Zone {
  id: number;
  nombre: string;
}

export interface Area {
  id: number;
  nombre: string;
  zona_id: number;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}
