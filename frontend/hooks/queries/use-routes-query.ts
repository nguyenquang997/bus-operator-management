import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/hooks/queries/query-keys";
import { routesService } from "@/services/routes.service";
import type { RoutePayload, RouteStopPayload } from "@/types/route";

export function useRoutesQuery() {
  return useQuery({ queryKey: queryKeys.routes, queryFn: routesService.getRoutes });
}

export function useRouteQuery(id: string) {
  return useQuery({ queryKey: queryKeys.route(id), queryFn: () => routesService.getRoute(id), enabled: !!id });
}

export function useCreateRouteMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: RoutePayload) => routesService.createRoute(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.routes })
  });
}

export function useUpdateRouteMutation(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: RoutePayload) => routesService.updateRoute(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.routes });
      qc.invalidateQueries({ queryKey: queryKeys.route(id) });
    }
  });
}

export function useDeleteRouteMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => routesService.deleteRoute(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.routes })
  });
}

export function useRouteStopsQuery(routeId: string) {
  return useQuery({
    queryKey: queryKeys.routeStops(routeId),
    queryFn: () => routesService.getRouteStops(routeId),
    enabled: !!routeId
  });
}

export function useCreateRouteStopMutation(routeId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: RouteStopPayload) => routesService.createRouteStop(routeId, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.routeStops(routeId) })
  });
}

export function useUpdateRouteStopMutation(routeId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: RouteStopPayload }) => routesService.updateRouteStop(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.routeStops(routeId) })
  });
}

export function useDeleteRouteStopMutation(routeId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => routesService.deleteRouteStop(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.routeStops(routeId) })
  });
}
