export interface Vehicle {
  id: number;
  branchId: number;
  code: string;
  plateNumber: string;
  vehicleType: string;
  brand?: string;
  model?: string;
  seatCount: number;
  yearOfManufacture?: number | null;
  status: string;
  isActive: boolean;
}

export interface VehiclePayload {
  branchId: number;
  code: string;
  plateNumber: string;
  vehicleType: string;
  brand?: string;
  model?: string;
  seatCount: number;
  yearOfManufacture?: number | null;
  status: string;
  isActive: boolean;
}
