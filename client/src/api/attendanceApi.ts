import axiosInstance from "./axiosInstance";

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
  const response = await axiosInstance.post("/Attendance/checkin");
  return response.data;
};

export const checkOut = async () => {
  const response = await axiosInstance.post("/Attendance/checkout");
  return response.data;
};

export const getMonthlyAttendance = async (
  month: number,
  year: number
): Promise<MonthlyAttendance> => {
  const response = await axiosInstance.get(
    `/Attendance/monthly?month=${month}&year=${year}`
  );

  return response.data;
};