export interface LoginResponse {
  data: DataLogin;
  message: string;
  status: number;
}

export interface DataLogin {
  token: string;
  user: User;
}

export interface User {
  email: string;
  id: number;
  nombre: string;
}
