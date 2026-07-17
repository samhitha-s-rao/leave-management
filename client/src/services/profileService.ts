import api from "../api/axios";
import type { UserProfile } from "../types/index";

export const getProfile = async (): Promise<UserProfile> => {
    const response = await api.get("/Profile");
    return response.data;
};

export const updateProfile = async (data: {
    phoneNumber: string;
    address: string;
}) => {
    const response = await api.put("/Profile", data);
    return response.data;
};