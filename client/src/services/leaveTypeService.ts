import {
  getLeaveTypes,
  updateLeaveType,
} from "../api/leaveTypeApi";

export const fetchLeaveTypes = async () => {
  return await getLeaveTypes();
};

export const editLeaveType = async (
  id: number,
  leaveTypeName: string,
  allocatedLeaves: number
) => {
  return await updateLeaveType(id, {
    leaveTypeName,
    allocatedLeaves,
  });
};