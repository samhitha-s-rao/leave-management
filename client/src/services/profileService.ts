import api from "../api/axios";
import type { UserProfile } from "../types/index";

export const getProfile = async (): Promise<UserProfile> => {
    const response = await api.get("/Profile");
    return response.data;
};

export const updateProfile = async (data: {
    phoneNumber: string;
    address: string;
}) => {
    const response = await api.put("/Profile", data);
    return response.data;
};

export interface UpdateEmployeeRequest {
  name: string;
  email: string;
  phone: string;
  address: string;
  departmentId: number;
  roleId: number;
  designation: string;
  dateOfJoining: string;
}

export interface UpdateEmployeeStatusRequest {
  isActive: boolean;
}

export interface EmployeeResponse {
  userId: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string | null;
  designation: string;
  dateOfJoining: string;
  isActive: boolean;
  roleId: number;
  roleName: "Employee" | "Manager" | "Admin";
  departmentId: number;
  departmentName: string;
  managerId?: number | null;
  managerName?: string | null;
}

export const getEmployees = async (): Promise<EmployeeResponse[]> => {
  const response = await api.get("/users");
  return response.data;
};

export const updateEmployee = async (
  id: number,
  data: UpdateEmployeeRequest
) => {
  const response = await api.put(`/users/${id}`, data);
  return response.data;
};

export const updateEmployeeStatus = async (
  id: number,
  isActive: boolean
) => {
  const response = await api.patch(`/users/${id}/status`, {
    isActive,
  });

  return response.data;
};