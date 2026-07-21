import api from "./axios";

export const getManagers = async () => {
  const response = await api.get("/Users/managers");
  return response.data;
};

export const getReportingManagers = async (roleId: number) => {
  const response = await api.get(`/Users/reporting-managers/${roleId}`);
  return response.data;
};