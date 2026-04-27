import { useMutation } from "@tanstack/react-query";
import { usersService } from "@/services/users.service";
import type { UserPayload } from "@/types/user";

export function useCreateUserMutation() {
  return useMutation({
    mutationFn: (payload: UserPayload) => usersService.createUser(payload)
  });
}
