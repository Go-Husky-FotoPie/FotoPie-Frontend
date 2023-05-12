export interface Notification {
  id: number;
  userAvatar: string;
  userName: string;
  post: string;
  directFilename: string;
}

export interface NotificationState {
  notifications: Notification[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
