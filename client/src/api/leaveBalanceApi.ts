import api from "./axios";

export const getMyLeaveBalance = async () => {
  const response = await api.get("/LeaveBalance/my-balance");
  return response.data;
};