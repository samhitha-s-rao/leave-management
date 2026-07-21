import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { toast } from "react-toastify";

import type { Department, Role, Manager } from "../../types/index";
import Cards from "../../components/Card/Card";
import { createEmployee } from "../../api/employeeApi";
import { getDepartments } from "../../api/departmentApi";
import { getRoles } from "../../api/roleApi";
import { getManagers, getReportingManagers } from "../../api/managerApi";
import { checkIn, checkOut } from "../../api/attendanceApi";
import "./Dashboard.css";

const Dashboard = () => {
  const user =
    JSON.parse(localStorage.getItem("user") || "null") ||
    JSON.parse(sessionStorage.getItem("user") || "null");

  const [isCheckedIn, setIsCheckedIn] = useState(
    localStorage.getItem("isCheckedIn") === "true"
  );

  const [openEmployeeModal, setOpenEmployeeModal] = useState(false);

  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    designation: "",
    dateOfJoining: "",
    departmentId: "",
    roleId: "",
    managerId: "",
  });

  const [departments, setDepartments] = useState<Department[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [managers, setManagers] = useState<Manager[]>([]);

  // Fetch initial dropdown data (Departments & Roles)
  useEffect(() => {
    const loadDropdowns = async () => {
      try {
        const [departmentData, roleData] = await Promise.all([
          getDepartments(),
          getRoles(),
        ]);

        setDepartments(departmentData);
        setRoles(roleData);
      } catch (error) {
        console.error("Dropdown API Error:", error);
      }
    };

    loadDropdowns();
  }, []);

  // Dynamically fetch reporting managers based on selected Role
  // Dynamically fetch reporting managers based on selected Role
// Dynamically fetch reporting managers based on selected Role
useEffect(() => {
  const fetchReportingManagers = async () => {
    try {
      // Find selected role object from state
      const selectedRole = roles.find(
        (r) => Number(r.roleId) === Number(employeeData.roleId)
      );

      const isManagerRole = selectedRole?.roleName?.toLowerCase() === "manager";

      let data: Manager[] = [];

      if (isManagerRole) {
        // 1. Fetch ALL users/managers (since getReportingManagers skips Admins)
        const allManagers = await getManagers();

        // 2. Filter specifically for Admin users
        data = allManagers.filter((m: any) => {
          const userRole = (m.roleName || m.role || "").toLowerCase();
          // Checks for "admin" OR falls back to user.role if logged-in user is Admin
          return userRole === "admin" || m.name === user?.name;
        });
      } else if (employeeData.roleId) {
        // For standard employees, fetch valid reporting managers for that role ID
        data = await getReportingManagers(Number(employeeData.roleId));
      } else {
        // Default fallback if no role is selected yet
        data = await getManagers();
      }

      setManagers(data);

      // Reset manager selection if current selection is invalid in the new list
      if (
        employeeData.managerId &&
        !data.some((m: Manager) => m.userId === Number(employeeData.managerId))
      ) {
        setEmployeeData((prev) => ({ ...prev, managerId: "" }));
      }
    } catch (error) {
      console.error("Error fetching reporting managers:", error);
    }
  };

  fetchReportingManagers();
}, [employeeData.roleId, roles, user?.name]);

  if (!user) return null;

  const handleCheckIn = async () => {
    try {
      const message = await checkIn();
      toast.success(message);
      setIsCheckedIn(true);
      localStorage.setItem("isCheckedIn", "true");
    } catch (error: any) {
      toast.error(error.response?.data || "Check In Failed");
    }
  };

  const handleCheckOut = async () => {
    try {
      const message = await checkOut();
      toast.success(message);
      setIsCheckedIn(false);
      localStorage.setItem("isCheckedIn", "false");
    } catch (error: any) {
      toast.error(error.response?.data || "Check Out Failed");
    }
  };

  const handleOpenEmployeeModal = () => {
    setOpenEmployeeModal(true);
  };

  const handleCloseEmployeeModal = () => {
    setOpenEmployeeModal(false);
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const { name, value } = e.target;

    setEmployeeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateEmployee = async () => {
    try {
      await createEmployee({
        name: employeeData.name,
        email: employeeData.email,
        password: employeeData.password,
        phoneNumber: employeeData.phoneNumber,
        address: employeeData.address,
        designation: employeeData.designation,
        dateOfJoining: employeeData.dateOfJoining,
        departmentId: Number(employeeData.departmentId),
        roleId: Number(employeeData.roleId),
        managerId: Number(employeeData.managerId),
      });

      toast.success("Employee Created Successfully");

      setEmployeeData({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
        designation: "",
        dateOfJoining: "",
        departmentId: "",
        roleId: "",
        managerId: "",
      });

      setOpenEmployeeModal(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create employee");
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="card">
          <div className="dashboard-header">
            <div className="user-info">
              <h2>Welcome, {user.name}</h2>
              <h3>Role: {user.role}</h3>
            </div>

            <div
              className="attendance-actions"
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              {user.role === "Admin" && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpenEmployeeModal}
                >
                  Create Employee
                </Button>
              )}

              <Button
                variant="contained"
                className="checkin-btn"
                onClick={handleCheckIn}
                disabled={isCheckedIn}
                sx={{
                  "&.Mui-disabled": {
                    backgroundColor: "#1565c0",
                    color: "#fff",
                    opacity: 1,
                  },
                }}
              >
                Check In
              </Button>

              <Button
                variant="contained"
                className="checkout-btn"
                onClick={handleCheckOut}
                disabled={!isCheckedIn}
                sx={{
                  "&.Mui-disabled": {
                    backgroundColor: "#1565c0",
                    color: "#fff",
                    opacity: 1,
                  },
                }}
              >
                Check Out
              </Button>
            </div>
          </div>

          <Cards role={user.role} />
        </div>
      </div>

      {/* Create Employee Dialog */}
      <Dialog
        open={openEmployeeModal}
        onClose={handleCloseEmployeeModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Create Employee</DialogTitle>

        <DialogContent
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 2,
            mt: 1,
          }}
        >
          <TextField
            label="Name"
            name="name"
            value={employeeData.name}
            onChange={handleInputChange}
            fullWidth
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            value={employeeData.email}
            onChange={handleInputChange}
            fullWidth
          />

          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={employeeData.phoneNumber}
            onChange={handleInputChange}
            fullWidth
          />

          <TextField
            label="Address"
            name="address"
            value={employeeData.address}
            onChange={handleInputChange}
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            value={employeeData.password}
            onChange={handleInputChange}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Department</InputLabel>
            <Select
              name="departmentId"
              value={employeeData.departmentId}
              onChange={handleInputChange}
              label="Department"
            >
              {departments.map((department) => (
                <MenuItem
                  key={department.departmentId}
                  value={department.departmentId}
                >
                  {department.departmentName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Designation"
            name="designation"
            value={employeeData.designation}
            onChange={handleInputChange}
            fullWidth
          />

          <TextField
            label="Date Of Joining"
            type="date"
            name="dateOfJoining"
            value={employeeData.dateOfJoining}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              name="roleId"
              value={employeeData.roleId}
              onChange={handleInputChange}
              label="Role"
            >
              {roles.map((role) => (
                <MenuItem key={role.roleId} value={role.roleId}>
                  {role.roleName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Reporting Manager</InputLabel>
            <Select
              name="managerId"
              value={employeeData.managerId}
              onChange={handleInputChange}
              label="Reporting Manager"
            >
              {managers.length > 0 ? (
                managers.map((manager) => (
                  <MenuItem key={manager.userId} value={manager.userId}>
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <span>{manager.name}</span>
                      <span
                        style={{
                          color: "#757575",
                          fontSize: "0.8rem",
                          fontStyle: "italic",
                        }}
                      >
                        ({manager.roleName})
                      </span>
                    </span>
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No Reporting Managers Found</MenuItem>
              )}
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseEmployeeModal}>Cancel</Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateEmployee}
          >
            Create Employee
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;