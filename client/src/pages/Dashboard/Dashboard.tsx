 
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
import type { Department,Role,Manager } from "../../types/index";
import "./Dashboard.css";
import Cards from "../../components/Card/Card";
import type { SelectChangeEvent } from "@mui/material";
import { useState, useEffect } from "react";
import { createEmployee } from "../../api/employeeApi";
import { getDepartments } from "../../api/departmentApi";
import { getRoles } from "../../api/roleApi";
import { getManagers } from "../../api/managerApi";
import { checkIn, checkOut } from "../../api/attendanceApi";
import { toast } from "react-toastify";
 
 
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
const [errors, setErrors] = useState({
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
useEffect(() => {
  const loadDropdowns = async () => {
    try {
      const [departmentData, roleData, managerData] = await Promise.all([
        getDepartments(),
        getRoles(),
        getManagers(),
      ]);
 
      console.log("Departments:", departmentData);
      console.log("Roles:", roleData);
      console.log("Managers:", managerData);
 
      setDepartments(departmentData);
      setRoles(roleData);
      setManagers(managerData);
    } catch (error) {
      console.error("Dropdown API Error:", error);
    }
  };
 
  loadDropdowns();
}, []);
 
 
  if (!user) return null;
 
  const handleCheckIn = async () => {
  try {
    const message = await checkIn();
 
    toast.success(message);
 
    setIsCheckedIn(true);
 
    localStorage.setItem("isCheckedIn", "true");
  } catch (error: any) {
    toast.error(
      error.response?.data || "Check In Failed"
    );
  }
};
 
  const handleCheckOut = async () => {
  try {
    const message = await checkOut();
 
    toast.success(message);
 
    setIsCheckedIn(false);
 
    localStorage.setItem("isCheckedIn", "false");
  } catch (error: any) {
    toast.error(
      error.response?.data || "Check Out Failed"
    );
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
 
  setErrors((prev) => ({
    ...prev,
    [name]: "",
  }));
};
const validateEmployee = () => {
  const newErrors = {
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
  };
 
  let valid = true;
 
  // Name
  if (!employeeData.name.trim()) {
    newErrors.name = "Name is required";
    valid = false;
  } else if (!/^[A-Za-z ]+$/.test(employeeData.name.trim())) {
    newErrors.name = "Only alphabets are allowed";
    valid = false;
  }
 
  // Email
  if (!employeeData.email.trim()) {
    newErrors.email = "Email is required";
    valid = false;
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(employeeData.email)
  ) {
    newErrors.email = "Invalid email address";
    valid = false;
  }
 
  // Password
  if (!employeeData.password) {
    newErrors.password = "Password is required";
    valid = false;
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
      employeeData.password
    )
  ) {
    newErrors.password =
      "Minimum 8 characters with uppercase, lowercase, number & special character";
    valid = false;
  }
 
  // Phone
  if (!employeeData.phoneNumber.trim()) {
    newErrors.phoneNumber = "Phone number is required";
    valid = false;
  } else if (!/^[6-9]\d{9}$/.test(employeeData.phoneNumber)) {
    newErrors.phoneNumber = "Enter a valid 10-digit mobile number";
    valid = false;
  }
 
  // Address
  if (!employeeData.address.trim()) {
    newErrors.address = "Address is required";
    valid = false;
  }
 
  // Designation
  if (!employeeData.designation.trim()) {
    newErrors.designation = "Designation is required";
    valid = false;
  }
 
  // DOJ
  if (!employeeData.dateOfJoining) {
    newErrors.dateOfJoining = "Date of Joining is required";
    valid = false;
  }
 
  // Department
  if (!employeeData.departmentId) {
    newErrors.departmentId = "Department is required";
    valid = false;
  }
 
  // Role
  if (!employeeData.roleId) {
    newErrors.roleId = "Role is required";
    valid = false;
  }
 
  // Manager
  if (!employeeData.managerId) {
    newErrors.managerId = "Reporting Manager is required";
    valid = false;
  }
 
  setErrors(newErrors);
 
  return valid;
};
const handleCreateEmployee = async () => {
   if (!validateEmployee()) {
    return;
  }
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
 
    alert("Employee Created Successfully");
 
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
    alert("Failed to create employee");
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
  onClick={handleCheckIn}
  disabled={isCheckedIn}
  sx={{
    "&.Mui-disabled": {
      backgroundColor: "#cfd8dc",
      color: "#616161",
      opacity: 1,
    },
  }}
>
  Check In
</Button>
 
<Button
  variant="contained"
  onClick={handleCheckOut}
  disabled={!isCheckedIn}
  sx={{
    "&.Mui-disabled": {
      backgroundColor: "#cfd8dc",
      color: "#616161",
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
    error={!!errors.name}
    helperText={errors.name}
    fullWidth
/>
 
          <TextField
    label="Email"
    type="email"
    name="email"
    value={employeeData.email}
    onChange={handleInputChange}
    error={!!errors.email}
    helperText={errors.email}
    fullWidth
/>
 
<TextField
    label="Phone Number"
    name="phoneNumber"
    value={employeeData.phoneNumber}
    onChange={handleInputChange}
    error={!!errors.phoneNumber}
    helperText={errors.phoneNumber}
    fullWidth
/>
<TextField
    label="Address"
    name="address"
    value={employeeData.address}
    onChange={handleInputChange}
    error={!!errors.address}
    helperText={errors.address}
    fullWidth
/>
 
<TextField
    label="Password"
    type="password"
    name="password"
    value={employeeData.password}
    onChange={handleInputChange}
    error={!!errors.password}
    helperText={errors.password}
    fullWidth
/>
 
<FormControl fullWidth error={!!errors.departmentId}>
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
  {errors.departmentId && (
    <p
        style={{
            color: "#d32f2f",
            fontSize: "12px",
            marginTop: "4px",
        }}
    >
        {errors.departmentId}
    </p>
)}
</FormControl>
 
<TextField
    label="Designation"
    name="designation"
    value={employeeData.designation}
    onChange={handleInputChange}
    error={!!errors.designation}
    helperText={errors.designation}
    fullWidth
/>
<TextField
    label="Date Of Joining"
    type="date"
    name="dateOfJoining"
    value={employeeData.dateOfJoining}
    onChange={handleInputChange}
    error={!!errors.dateOfJoining}
    helperText={errors.dateOfJoining}
    InputLabelProps={{ shrink: true }}
    fullWidth
/>
 
          <FormControl fullWidth error={!!errors.roleId}>
  <InputLabel>Role</InputLabel>
 
  <Select
    name="roleId"
    value={employeeData.roleId}
    onChange={handleInputChange}
    label="Role"
  >
    {roles.map((role) => (
      <MenuItem
        key={role.roleId}
        value={role.roleId}
      >
        {role.roleName}
      </MenuItem>
    ))}
  </Select>
  {errors.roleId && (
<p style={{ color: "#d32f2f", fontSize: 12 }}>
    {errors.roleId}
</p>
)}
</FormControl>
 
<FormControl fullWidth error={!!errors.managerId}>
  <InputLabel>Reporting Manager</InputLabel>
 
  <Select
    name="managerId"
    value={employeeData.managerId}
    onChange={handleInputChange}
    label="Reporting Manager"
  >
    {managers.length > 0 ? (
      managers.map((manager) => (
        <MenuItem
          key={manager.userId}
          value={manager.userId}
        >
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
  {errors.managerId && (
<p style={{ color: "#d32f2f", fontSize: 12 }}>
    {errors.managerId}
</p>
)}
</FormControl>
        </DialogContent>
 
        <DialogActions sx={{
    justifyContent: "flex-end",
    gap: 2,
    px: 3,
    pb: 2,
  }}>
          <Button onClick={handleCloseEmployeeModal}>
            Cancel
          </Button>
 
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