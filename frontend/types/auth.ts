export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface AuthUser {
  id: number;
  username: string;
  fullName: string;
  roles?: string[];
}
