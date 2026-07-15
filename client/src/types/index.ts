import React from "react";

export type UserRole = "Employee" | "Manager" | "Admin";

export interface User {
  id?: string;
  name: string;
  email?: string;
  role: UserRole;
}

export interface SidebarProps {
  userRole: UserRole;
  activeItem: string;
  setActiveItem: React.Dispatch<React.SetStateAction<string>>;
}

export interface SidebarItem {
  text: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

export interface EmployeeCardProps {
  user: MockUser;
}

export interface Holiday {
  id: number;
  title: string;
  date: string;
}

export interface MockUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "Employee" | "Manager" | "Admin";
  phone: string;
  address: string;
  department: string;
  designation: string;
  dateOfJoining: string;

  profileImage?: string;
  active?: boolean;
}


export interface LeaveType {
  leaveTypeId: number;
  leaveTypeName: string;
  allocatedLeaves: number;
}


export interface LeaveRequest {
  leaveRequestId: number;
  userId: number;
  userName: string;
  departmentName: string;
  leaveTypeName: string;
  startDate: string;
  endDate: string;
  numberOfDays: number;
  reason: string;
  appliedDate: string | null;
}

export interface LeaveHistory {
  leaveRequestId: number;
  leaveTypeName: string;
  startDate: string;
  endDate: string;
  numberOfDays: number;
  reason: string;
  status: string;
}

export interface EmployeeLeaveHistory {
  userId: number;
  userName: string;
  departmentName: string;
  roleName: string;
  leaveTypeName: string;
  startDate: string;
  endDate: string;
  numberOfDays: number;
  status: string;
}
export interface Employee {
  id: number;
  name: string;
  email: string;
  role: "Employee" | "Manager" | "Admin";
  department: string;
  designation: string;
  phone: string;
  address: string;
  dateOfJoining: string;
  profileImage?: string;
  active: boolean;
}

export interface EmployeeEditDialogProps {
  open: boolean;
  employee: Employee | null;
  onClose: () => void;
  onSave: (employee: Employee) => void;
}

export interface EmployeeActionMenuProps {
  active: boolean;
  onEdit: () => void;
  onToggleStatus: () => void;
}

