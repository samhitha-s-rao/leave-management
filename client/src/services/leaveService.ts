import axios from "axios";

const API_URL = "http://localhost:5238/api";

const api = axios.create({
  baseURL: API_URL,
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


// Leave Types
export const getLeaveTypes = () => {
  return api.get("/LeaveType");
};


// Apply Leave
export const applyLeave = (data: any) => {
  return api.post("/Leave/apply", data);
};


// Employee Leave History
export const getMyLeaves = () => {
  return api.get("/Leave/my-requests");
};


// Pending Leaves (Manager/Admin)
export const getPendingLeaves = () => {
  return api.get("/Leave/pending");
};


// Approve / Reject Leave
export const leaveDecision = (
  leaveRequestId: number,
  data: any
) => {
  return api.put(
    `/Leave/${leaveRequestId}/decision`,
    data
  );
};