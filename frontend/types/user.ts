export type AppRole = "ADMIN" | "OPERATOR" | "ACCOUNTANT" | "STAFF";

export interface User {
  id: number;
  branchId: number;
  username: string;
  fullName: string;
  email?: string | null;
  phoneNumber?: string | null;
  isActive: boolean;
  roles: AppRole[];
}

export interface UserPayload {
  branchId: number;
  username: string;
  password: string;
  fullName: string;
  email?: string;
  phoneNumber?: string;
  isActive: boolean;
  roleCodes: AppRole[];
}
