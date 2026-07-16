import api from "./axios";

export const getManagers = async () => {
  const response = await api.get("/Users/managers");
  return response.data;
};