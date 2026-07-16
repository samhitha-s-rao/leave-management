import api from "./axios";

export const getLeaveTypes = async () => {
  const response = await api.get("/LeaveType");
  return response.data;
};

export const updateLeaveType = async (
  id: number,
  data: {
    leaveTypeName: string;
    allocatedLeaves: number;
  }
) => {
  const response = await api.put(
    `/LeaveType/${id}`,
    data
  );

  return response.data;
};