import { useState } from "react";
import {
  Box,
  Typography,
  Chip,
} from "@mui/material";

import { mockUsers } from "../../mock/users";
import AppTable from "../../components/common/AppTable";

import EmployeeActionMenu from "../../components/employess/EmployeeActionMenu";
import EmployeeEditDialog from "../../components/employess/EmployeeEditDialog";
import type { Employee } from "../../types";

const EmployeeList = () => {

  const [employees, setEmployees] = useState<Employee[]>(
    mockUsers
      .filter((user) => user.role !== "Admin")
      .map((user) => ({
        ...user,
        address: user.address ?? "",
        profileImage: user.profileImage ?? "",
        active:
          user.active !== undefined
            ? user.active
            : true,
      }))
  );

  const [selectedEmployee, setSelectedEmployee] =
    useState<Employee | null>(null);

  const [openEditDialog, setOpenEditDialog] =
    useState(false);

  const handleEdit = (
    employee: Employee
  ) => {
    setSelectedEmployee(employee);
    setOpenEditDialog(true);
  };

  const handleSave = (
    updatedEmployee: Employee
  ) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === updatedEmployee.id
          ? updatedEmployee
          : emp
      )
    );

    setOpenEditDialog(false);
  };

  const handleToggleStatus = (
    id: number
  ) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id
          ? {
              ...emp,
              active: !emp.active,
            }
          : emp
      )
    );
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
          onEdit={() =>
            handleEdit(row)
          }
          onToggleStatus={() =>
            handleToggleStatus(
              row.id
            )
          }
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
