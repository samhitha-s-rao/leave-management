import api from "./axios";

export interface CreateEmployeeDto {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  designation: string;
  dateOfJoining: string;
  departmentId: number;
  roleId: number;
  managerId: number| null;
}

export const createEmployee = async (employee: CreateEmployeeDto) => {
  const response = await api.post("/Users", employee);
  return response.data;
};