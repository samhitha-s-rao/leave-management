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
}


export interface LeaveType {
  id: number;
  leaveType: string;
  totalLeaves: number;
}