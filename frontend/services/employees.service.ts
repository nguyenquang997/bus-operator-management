import { apiClient } from "@/services/api-client";
import type { Employee, EmployeePayload } from "@/types/employee";

interface EmployeeApi {
  Id: number;
  BranchId: number;
  Code: string;
  FullName: string;
  PhoneNumber?: string;
  EmployeeType: string;
  LicenseNumber?: string;
  LicenseClass?: string;
  HireDate?: string;
  Status: string;
  IsActive: boolean;
}

const mapEmployee = (x: EmployeeApi): Employee => ({
  id: x.Id,
  branchId: x.BranchId,
  code: x.Code,
  fullName: x.FullName,
  phoneNumber: x.PhoneNumber,
  employeeType: x.EmployeeType,
  licenseNumber: x.LicenseNumber,
  licenseClass: x.LicenseClass,
  hireDate: x.HireDate,
  status: x.Status,
  isActive: x.IsActive
});

const toBody = (payload: EmployeePayload) => ({
  BranchId: payload.branchId,
  Code: payload.code,
  FullName: payload.fullName,
  PhoneNumber: payload.phoneNumber || null,
  EmployeeType: payload.employeeType,
  LicenseNumber: payload.licenseNumber || null,
  LicenseClass: payload.licenseClass || null,
  HireDate: payload.hireDate || null,
  Status: payload.status,
  IsActive: payload.isActive
});

export const employeesService = {
  getEmployees: async () => (await apiClient.get<EmployeeApi[]>("/api/employees")).map(mapEmployee),
  getEmployee: async (id: string) => mapEmployee(await apiClient.get<EmployeeApi>(`/api/employees/${id}`)),
  createEmployee: async (payload: EmployeePayload) =>
    mapEmployee(await apiClient.post<EmployeeApi, ReturnType<typeof toBody>>("/api/employees", toBody(payload))),
  updateEmployee: async (id: string, payload: EmployeePayload) =>
    mapEmployee(await apiClient.put<EmployeeApi, ReturnType<typeof toBody>>(`/api/employees/${id}`, toBody(payload))),
  deleteEmployee: (id: string) => apiClient.delete<void>(`/api/employees/${id}`)
};
