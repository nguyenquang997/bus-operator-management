import { getAccessToken } from "@/lib/storage";

function decodeBase64Url(input: string): string {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  return atob(padded);
}

function getTokenRoles(): string[] {
  const token = getAccessToken();
  if (!token) return [];

  const parts = token.split(".");
  if (parts.length < 2) return [];

  try {
    const payloadText = decodeBase64Url(parts[1]);
    const payload = JSON.parse(payloadText) as Record<string, unknown>;

    const roleClaimUri = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    const roleClaim = payload[roleClaimUri] ?? payload.role;
    if (Array.isArray(roleClaim)) {
      return roleClaim.filter((x): x is string => typeof x === "string");
    }
    if (typeof roleClaim === "string") {
      return [roleClaim];
    }

    return [];
  } catch {
    return [];
  }
}

export function getEffectiveRoles(userRoles?: string[]): string[] {
  const tokenRoles = getTokenRoles();
  if (tokenRoles.length > 0) {
    return tokenRoles;
  }
  return userRoles || [];
}
