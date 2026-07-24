import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export interface User {
  userId: number;
  name: string;
  email: string;
  designation: string;
  departmentId: number;
}


export const getUsers = async (): Promise<User[]> => {
  const response = await api.get("/Users");

  return response.data;
};