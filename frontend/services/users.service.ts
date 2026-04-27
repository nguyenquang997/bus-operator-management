import { apiClient } from "@/services/api-client";
import type { User, UserPayload } from "@/types/user";

interface UserApi {
  Id: number;
  BranchId: number;
  Username: string;
  FullName: string;
  Email?: string;
  PhoneNumber?: string;
  IsActive: boolean;
  Roles: string[];
}

const mapUser = (x: UserApi): User => ({
  id: x.Id,
  branchId: x.BranchId,
  username: x.Username,
  fullName: x.FullName,
  email: x.Email,
  phoneNumber: x.PhoneNumber,
  isActive: x.IsActive,
  roles: x.Roles as User["roles"]
});

const toBody = (payload: UserPayload) => ({
  BranchId: payload.branchId,
  Username: payload.username,
  Password: payload.password,
  FullName: payload.fullName,
  Email: payload.email || null,
  PhoneNumber: payload.phoneNumber || null,
  IsActive: payload.isActive,
  RoleCodes: payload.roleCodes
});

export const usersService = {
  createUser: async (payload: UserPayload) =>
    mapUser(await apiClient.post<UserApi, ReturnType<typeof toBody>>("/api/users", toBody(payload)))
};
