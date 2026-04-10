export interface Employee {
  id: number;
  branchId: number;
  code: string;
  fullName: string;
  phoneNumber?: string;
  employeeType: string;
  licenseNumber?: string;
  licenseClass?: string;
  hireDate?: string | null;
  status: string;
  isActive: boolean;
}

export interface EmployeePayload {
  branchId: number;
  code: string;
  fullName: string;
  phoneNumber?: string;
  employeeType: string;
  licenseNumber?: string;
  licenseClass?: string;
  hireDate?: string | null;
  status: string;
  isActive: boolean;
}
