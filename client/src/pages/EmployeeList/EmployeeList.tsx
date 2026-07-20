import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Chip,
} from "@mui/material";

import AppTable from "../../components/common/AppTable";

import EmployeeActionMenu from "../../components/Employees/EmployeeActionMenu";
import EmployeeEditDialog from "../../components/Employees/EmployeeEditDialog";

import {
  getEmployees,
  updateEmployee,
  updateEmployeeStatus,
  type EmployeeResponse,
} from "../../services/profileService";

import type { Employee } from "../../types";

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [selectedEmployee, setSelectedEmployee] =
    useState<Employee | null>(null);

  const [openEditDialog, setOpenEditDialog] =
    useState(false);

  const fetchEmployees = async () => {
    try {
      const users = await getEmployees();

      const mappedEmployees: Employee[] = users
  .filter(
    (user: EmployeeResponse) =>
      user.roleName !== "Admin"
  )
  .map(
    (user: EmployeeResponse) => ({
      id: user.userId,
      userId: user.userId,

      name: user.name,
      email: user.email,

      role: user.roleName as
        | "Employee"
        | "Manager"
        | "Admin",

      roleId: user.roleId,

      department:
        user.departmentName,

      departmentId:
        user.departmentId,

      designation:
        user.designation ?? "",

      phone:
        user.phoneNumber ?? "",

      address:
        user.address ?? "",

      dateOfJoining:
        user.dateOfJoining,

      active: user.isActive,

      profileImage: "",
    })
  );
      setEmployees(mappedEmployees);
    } catch (error) {
      console.error(
        "Failed to fetch employees",
        error
      );
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

 const handleEdit = (employee: Employee) => {
  console.log("Opening dialog");

  setSelectedEmployee(employee);
  setOpenEditDialog(true);

  alert("Edit clicked");
};

  const handleSave = async (
    updatedEmployee: Employee
  ) => {
    try {
      await updateEmployee(
        updatedEmployee.userId,
        {
          name: updatedEmployee.name,
          email: updatedEmployee.email,
          phone: updatedEmployee.phone,
          address: updatedEmployee.address,
          departmentId:
            updatedEmployee.departmentId,
          roleId:
            updatedEmployee.roleId,
          designation:
            updatedEmployee.designation,
          dateOfJoining:
            updatedEmployee.dateOfJoining,
        }
      );

      await fetchEmployees();

      setOpenEditDialog(false);
      setSelectedEmployee(null);
    } catch (error) {
      console.error(
        "Update failed",
        error
      );
    }
  };

 const handleToggleStatus = async (
  employee: Employee
) => {
  console.log("Status Employee:", employee);

  try {
    await updateEmployeeStatus(
      employee.userId,
      !employee.active
    );

    console.log("Status Updated");

    await fetchEmployees();
  } catch (error) {
    console.error(error);
  }
};

  const columns = [
    {
      field: "id",
      headerName: "ID",
    },

    {
      field: "name",
      headerName: "Name",
    },

    {
      field: "email",
      headerName: "Email",
    },

    {
      field: "role",
      headerName: "Role",

      render: (row: Employee) => (
        <Chip
          label={row.role}
          color={
            row.role === "Manager"
              ? "warning"
              : "primary"
          }
          size="small"
        />
      ),
    },

    {
      field: "department",
      headerName: "Department",
    },

    {
      field: "phone",
      headerName: "Phone",
    },

    {
      field: "designation",
      headerName: "Designation",
    },

    {
      field: "dateOfJoining",
      headerName: "Date Of Joining",
    },

    {
      field: "status",
      headerName: "Status",

      render: (row: Employee) => (
        <Chip
          label={
            row.active
              ? "Active"
              : "Inactive"
          }
          color={
            row.active
              ? "success"
              : "default"
          }
          size="small"
        />
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      align: "center" as const,

      render: (row: Employee) => (
  <EmployeeActionMenu
    active={row.active}
    onEdit={() => {
      console.log("Edit clicked", row);
      handleEdit(row);
    }}
    onToggleStatus={() => {
      console.log("Toggle clicked", row);
      handleToggleStatus(row);
    }}
  />
),
    },
  ];

  return (
    <Box p={4}>
      <Typography
        variant="h4"
        mb={3}
      >
        Employee List
      </Typography>

      <AppTable
        columns={columns}
        rows={employees}
        noDataMessage="No employees found."
        getRowStyle={(row) => ({
          opacity: row.active ? 1 : 0.45,
          backgroundColor: row.active
            ? "#fff"
            : "#f5f5f5",
          transition: "all 0.3s ease",
        })}
      />

      <EmployeeEditDialog
        open={openEditDialog}
        employee={selectedEmployee}
        onClose={() => {
          setOpenEditDialog(false);
          setSelectedEmployee(null);
        }}
        onSave={handleSave}
      />
    </Box>
  );
};

export default EmployeeList;