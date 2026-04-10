export interface Route {
  id: number;
  code: string;
  name: string;
  fromLocation: string;
  toLocation: string;
  distanceKm: number;
  estimatedDurationMinutes: number;
  baseTicketPrice: number;
  isActive: boolean;
}

export interface RoutePayload {
  code: string;
  name: string;
  fromLocation: string;
  toLocation: string;
  distanceKm: number;
  estimatedDurationMinutes: number;
  baseTicketPrice: number;
  isActive: boolean;
}

export interface RouteStop {
  id: number;
  routeId: number;
  stopOrder: number;
  stopName: string;
  address?: string | null;
  stopType: string;
  estimatedOffsetMinutes?: number | null;
  isActive: boolean;
}

export interface RouteStopPayload {
  stopOrder: number;
  stopName: string;
  address?: string;
  stopType: string;
  estimatedOffsetMinutes?: number | null;
  isActive: boolean;
}
