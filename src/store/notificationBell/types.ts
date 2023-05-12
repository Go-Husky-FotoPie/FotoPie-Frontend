export interface NotificationState {
  notificationCount: number;
  isNotificationRead: boolean;
  getNotificationCountStatus: "idle" | "loading" | "succeeded" | "failed";
  markNotificationReadStatus: "idle" | "loading" | "succeeded" | "failed";
  getNotificationCountError: string | null;
  markNotificationReadError: string | null;
}
