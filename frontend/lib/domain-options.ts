export const DEFAULT_BRANCH_ID = 1;

export const VEHICLE_STATUSES = ["ACTIVE", "MAINTENANCE", "INACTIVE"] as const;
export const EMPLOYEE_TYPES = ["DRIVER", "ASSISTANT", "OPERATOR", "ACCOUNTANT"] as const;
export const TRIP_STATUSES = ["DRAFT", "SCHEDULED", "IN_PROGRESS", "COMPLETED", "CANCELLED"] as const;

export const REVENUE_TYPE_OPTIONS = [
  { id: 1, label: "Passenger Ticket" },
  { id: 2, label: "Cargo" },
  { id: 3, label: "Shuttle" },
  { id: 4, label: "Other" }
] as const;

export const EXPENSE_TYPE_OPTIONS = [
  { id: 1, label: "Fuel" },
  { id: 2, label: "Driver Salary" },
  { id: 3, label: "Assistant Salary" },
  { id: 4, label: "Toll" },
  { id: 5, label: "Parking" },
  { id: 6, label: "Food" },
  { id: 7, label: "Other" }
] as const;
