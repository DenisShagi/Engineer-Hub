import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSession } from "@/shared/model/session";
import { ROUTES } from "@/shared/model/routes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useLogin() {
  const navigate = useNavigate();
  const session = useSession();

  const loginMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Ошибка авторизации");
      return json;
    },
    onSuccess: (data) => {
      session.login(data.accessToken);
      navigate(ROUTES.HOME);
    },
  });

  return {
    login: loginMutation.mutate,
    resetError: loginMutation.reset,
    isPending: loginMutation.isPending,
    errorMessage: loginMutation.error
      ? (loginMutation.error as Error).message
      : undefined,
  };
}
