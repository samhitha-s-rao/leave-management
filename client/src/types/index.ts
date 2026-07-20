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
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    designation?: string;
    department?: string;
    dateOfJoining?: string;
  };
}

export interface Holiday {
  id: number;
  title: string;
  date: string;
}

export interface CardProps {
role: string;
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

export interface Department {
  departmentId: number;
  departmentName: string;
}

export interface Role {
  roleId: number;
  roleName: string;
}

export interface Manager {
  userId: number;
  name: string;
  roleName: string;

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
  userId: number;
  roleId: number;
  departmentId: number;

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
export interface Notification {
    notificationId: number;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
    link?: string;
}
export interface UserProfile {
  userId: number;
  employeeId: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  role: string;
  department: string;
}
