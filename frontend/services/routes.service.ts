import { apiClient } from "@/services/api-client";
import type { Route, RoutePayload, RouteStop, RouteStopPayload } from "@/types/route";

interface RouteApi {
  Id: number;
  Code: string;
  Name: string;
  FromLocation: string;
  ToLocation: string;
  DistanceKm: number;
  EstimatedDurationMinutes: number;
  BaseTicketPrice: number;
  IsActive: boolean;
}

interface RouteStopApi {
  Id: number;
  RouteId: number;
  StopOrder: number;
  StopName: string;
  Address?: string;
  StopType: string;
  EstimatedOffsetMinutes?: number;
  IsActive: boolean;
}

const mapRoute = (x: RouteApi): Route => ({
  id: x.Id,
  code: x.Code,
  name: x.Name,
  fromLocation: x.FromLocation,
  toLocation: x.ToLocation,
  distanceKm: Number(x.DistanceKm),
  estimatedDurationMinutes: x.EstimatedDurationMinutes,
  baseTicketPrice: Number(x.BaseTicketPrice),
  isActive: x.IsActive
});

const mapRouteStop = (x: RouteStopApi): RouteStop => ({
  id: x.Id,
  routeId: x.RouteId,
  stopOrder: x.StopOrder,
  stopName: x.StopName,
  address: x.Address,
  stopType: x.StopType,
  estimatedOffsetMinutes: x.EstimatedOffsetMinutes,
  isActive: x.IsActive
});

const toRouteBody = (payload: RoutePayload) => ({
  Code: payload.code,
  Name: payload.name,
  FromLocation: payload.fromLocation,
  ToLocation: payload.toLocation,
  DistanceKm: payload.distanceKm,
  EstimatedDurationMinutes: payload.estimatedDurationMinutes,
  BaseTicketPrice: payload.baseTicketPrice,
  IsActive: payload.isActive
});

const toStopBody = (payload: RouteStopPayload) => ({
  StopOrder: payload.stopOrder,
  StopName: payload.stopName,
  Address: payload.address || null,
  StopType: payload.stopType,
  EstimatedOffsetMinutes: payload.estimatedOffsetMinutes ?? null,
  IsActive: payload.isActive
});

export const routesService = {
  getRoutes: async () => (await apiClient.get<RouteApi[]>("/api/routes")).map(mapRoute),
  getRoute: async (id: string) => mapRoute(await apiClient.get<RouteApi>(`/api/routes/${id}`)),
  createRoute: async (payload: RoutePayload) =>
    mapRoute(await apiClient.post<RouteApi, ReturnType<typeof toRouteBody>>("/api/routes", toRouteBody(payload))),
  updateRoute: async (id: string, payload: RoutePayload) =>
    mapRoute(await apiClient.put<RouteApi, ReturnType<typeof toRouteBody>>(`/api/routes/${id}`, toRouteBody(payload))),
  deleteRoute: (id: string) => apiClient.delete<void>(`/api/routes/${id}`),
  getRouteStops: async (routeId: string) =>
    (await apiClient.get<RouteStopApi[]>(`/api/routes/${routeId}/stops`)).map(mapRouteStop),
  createRouteStop: async (routeId: string, payload: RouteStopPayload) =>
    mapRouteStop(await apiClient.post<RouteStopApi, ReturnType<typeof toStopBody>>(`/api/routes/${routeId}/stops`, toStopBody(payload))),
  updateRouteStop: async (id: string, payload: RouteStopPayload) =>
    mapRouteStop(await apiClient.put<RouteStopApi, ReturnType<typeof toStopBody>>(`/api/route-stops/${id}`, toStopBody(payload))),
  deleteRouteStop: (id: string) => apiClient.delete<void>(`/api/route-stops/${id}`)
};
