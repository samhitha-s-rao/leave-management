import api from "./axios";

export const getDepartments = async () => {
  const response = await api.get("/Departments");
  return response.data;
};