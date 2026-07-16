import api from "./axios";

export const getRoles = async () => {
  const response = await api.get("/Roles");
  return response.data;
};