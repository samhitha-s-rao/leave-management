import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5238/api",
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

export interface AttendanceRecord {
  attendanceId: number;
  attendanceDate: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  workingHours: number;
}

export interface MonthlyAttendance {
  present: number;
  absent: number;
  leave: number;
  halfDay: number;
  weeklyOff: number;
  totalDays: number;
  attendance: AttendanceRecord[];
}

export const checkIn = async () => {
  const response = await api.post("/Attendance/checkin");
  return response.data;
};

export const checkOut = async () => {
  const response = await api.post("/Attendance/checkout");
  return response.data;
};

export const getMonthlyAttendance = async (
  month: number,
  year: number
): Promise<MonthlyAttendance> => {
  const response = await api.get(
    `/Attendance/monthly?month=${month}&year=${year}`
  );

  return response.data;
};