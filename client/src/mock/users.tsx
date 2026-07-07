export interface MockUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "Employee" | "Manager" | "Admin";
  phone: string;
}

export const mockUsers: MockUser[] = [
  {
    id: 1,
    name: "John Doe",
    email: "employee@test.com",
    password: "123456",
    role: "Employee",
    phone: "123-456-7890",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "manager@test.com",
    password: "123456",
    role: "Manager",
    phone: "987-654-3210",
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@test.com",
    password: "123456",
    role: "Admin",
    phone: "123-456-7890",
  },
];