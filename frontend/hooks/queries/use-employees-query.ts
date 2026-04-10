import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/hooks/queries/query-keys";
import { employeesService } from "@/services/employees.service";
import type { EmployeePayload } from "@/types/employee";

export function useEmployeesQuery() {
  return useQuery({ queryKey: queryKeys.employees, queryFn: employeesService.getEmployees });
}

export function useEmployeeQuery(id: string) {
  return useQuery({ queryKey: queryKeys.employee(id), queryFn: () => employeesService.getEmployee(id), enabled: !!id });
}

export function useCreateEmployeeMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: EmployeePayload) => employeesService.createEmployee(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.employees })
  });
}

export function useUpdateEmployeeMutation(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: EmployeePayload) => employeesService.updateEmployee(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.employees });
      qc.invalidateQueries({ queryKey: queryKeys.employee(id) });
    }
  });
}

export function useDeleteEmployeeMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => employeesService.deleteEmployee(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.employees })
  });
}
