export const queryKeys = {
  me: ["auth", "me"] as const,
  dashboardSummary: ["dashboard", "summary"] as const,
  routes: ["routes"] as const,
  route: (id: string) => ["routes", id] as const,
  routeStops: (routeId: string) => ["route-stops", routeId] as const,
  vehicles: ["vehicles"] as const,
  vehicle: (id: string) => ["vehicles", id] as const,
  employees: ["employees"] as const,
  employee: (id: string) => ["employees", id] as const,
  trips: ["trips"] as const,
  trip: (id: string) => ["trips", id] as const,
  revenue: (tripId: string) => ["trips", tripId, "revenue"] as const,
  expense: (tripId: string) => ["trips", tripId, "expense"] as const,
  tripReport: ["reports", "trips"] as const
};
