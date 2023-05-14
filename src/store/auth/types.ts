export interface AuthState {
  isAuthenticated: boolean;
  error: string | null;
  loginStatus: "idle" | "loading" | "success" | "failed";
  logoutStatus: "idle" | "loading" | "success" | "failed";
}