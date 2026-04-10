import { apiClient } from "@/services/api-client";
import type { AuthUser, LoginRequest } from "@/types/auth";

interface LoginRawResponse {
  accessToken?: string;
  AccessToken?: string;
  token?: string;
  jwtToken?: string;
  data?: {
    accessToken?: string;
    token?: string;
  };
}

interface MeApi {
  Id: number;
  Username: string;
  FullName: string;
  Roles?: string[];
}

export const authService = {
  login: async (payload: LoginRequest): Promise<{ accessToken: string }> => {
    const response = await apiClient.post<LoginRawResponse, LoginRequest>("/api/auth/login", payload);

    const accessToken =
      response.accessToken ||
      response.AccessToken ||
      response.token ||
      response.jwtToken ||
      response.data?.accessToken ||
      response.data?.token;

    if (!accessToken) {
      throw new Error("Login success but access token was not found in response");
    }

    return { accessToken };
  },

  me: async (): Promise<AuthUser> => {
    const response = await apiClient.get<MeApi | { data?: MeApi; user?: MeApi }>("/api/auth/me");
    const me = (response as { user?: MeApi }).user || (response as { data?: MeApi }).data || (response as MeApi);
    return {
      id: me.Id,
      username: me.Username,
      fullName: me.FullName,
      roles: me.Roles || []
    };
  }
};
