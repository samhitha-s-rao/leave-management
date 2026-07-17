import api from "../api/axios";
import type { Notification } from "../types/index";

export const getNotifications = async (): Promise<Notification[]> => {
    const response = await api.get("/Notification");
    return response.data;
};

export const getUnreadCount = async (): Promise<number> => {
    const response = await api.get("/Notification/unread-count");
    return response.data.unreadCount;
};

export const markAsRead = async (id: number) => {
    await api.put(`/Notification/${id}/read`);
};

export const markAllAsRead = async () => {
    await api.put("/Notification/read-all");
};