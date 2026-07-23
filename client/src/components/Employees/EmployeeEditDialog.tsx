import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
 
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import type {  Employee, EmployeeEditDialogProps } from "../../types";
 
 
const EmployeeEditDialog = ({
  open,
  employee,
  onClose,
  onSave,
}: EmployeeEditDialogProps) => {
  const [formData, setFormData] =
    useState<Employee | null>(null);
const [errors, setErrors] = useState({
  name: "",
  email: "",
  phone: "",
  address: "",
  department: "",
  designation: "",
  role: "",
  dateOfJoining: "",
});
  useEffect(() => {
    if (employee) {
      setFormData({ ...employee });
    }
  }, [employee]);
 
  if (!formData) return null;
 
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
 
  setErrors((prev) => ({
    ...prev,
    [e.target.name]: "",
  }));
};
 
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
 
    if (!file) return;
 
    const reader = new FileReader();
 
    reader.onloadend = () => {
      setFormData({
        ...formData,
        profileImage: reader.result as string,
      });
    };
 
    reader.readAsDataURL(file);
  };
  const validateEmployee = () => {
  if (!formData) return false;
 
  const newErrors = {
    name: "",
    email: "",
    phone: "",
    address: "",
    department: "",
    designation: "",
    role: "",
    dateOfJoining: "",
  };
 
  let valid = true;
 
  // Name
  if (!formData.name.trim()) {
    newErrors.name = "Name is required";
    valid = false;
  } else if (!/^[A-Za-z ]+$/.test(formData.name.trim())) {
    newErrors.name = "Only letters and spaces are allowed";
    valid = false;
  }
 
  // Email
  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
    valid = false;
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
  ) {
    newErrors.email = "Invalid email address";
    valid = false;
  }
 
  // Phone
  if (!formData.phone.trim()) {
    newErrors.phone = "Phone number is required";
    valid = false;
  } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
    newErrors.phone = "Enter a valid 10-digit mobile number";
    valid = false;
  }
 
  // Address
  if (!formData.address.trim()) {
    newErrors.address = "Address is required";
    valid = false;
  }
 
  // Department
  if (!formData.department.trim()) {
    newErrors.department = "Department is required";
    valid = false;
  }
 
  // Designation
  if (!formData.designation.trim()) {
    newErrors.designation = "Designation is required";
    valid = false;
  }
 
  // Role
  if (!formData.role) {
    newErrors.role = "Role is required";
    valid = false;
  }
 
  // Date Of Joining
  if (!formData.dateOfJoining) {
    newErrors.dateOfJoining = "Date of Joining is required";
    valid = false;
  } else if (new Date(formData.dateOfJoining) > new Date()) {
    newErrors.dateOfJoining =
      "Joining date cannot be in the future";
    valid = false;
  }
 
  setErrors(newErrors);
 
  return valid;
};
 
const handleSave = () => {
  if (!validateEmployee()) return;
 
  onSave({
    ...formData,
    name: formData.name.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim(),
    address: formData.address.trim(),
    designation: formData.designation.trim(),
  });
};
 
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        Edit Employee
      </DialogTitle>
 
      <DialogContent>
 
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb={3}
        >
          <Avatar
            src={formData.profileImage}
            sx={{
              width: 110,
              height: 110,
            }}
          >
            {!formData.profileImage && (
              <AccountCircleIcon
                sx={{ fontSize: 100 }}
              />
            )}
          </Avatar>
 
          <Button
            component="label"
            variant="outlined"
            sx={{ mt: 2 }}
          >
            Upload Photo
 
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </Button>
        </Box>
 
        <Grid container spacing={2}>
 
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
               helperText={errors.name}
            />
          </Grid>
 
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
 
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
helperText={errors.phone}
            />
          </Grid>
 
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={!!errors.address}
helperText={errors.address}
            />
          </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              error={!!errors.department}
helperText={errors.department}
            />
          </Grid>
 
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              error={!!errors.designation}
helperText={errors.designation}
            />
          </Grid>
 
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              fullWidth
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              error={!!errors.role}
helperText={errors.role}
            >
              <MenuItem value="Employee">
                Employee
              </MenuItem>
 
              <MenuItem value="Manager">
                Manager
              </MenuItem>
            </TextField>
          </Grid>
 
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              type="date"
              label="Date Of Joining"
              name="dateOfJoining"
              value={formData.dateOfJoining}
              onChange={handleChange}
              error={!!errors.dateOfJoining}
helperText={errors.dateOfJoining}
              InputLabelProps={{
                shrink: true,
               
              }}
            />
          </Grid>
 
        </Grid>
 
        <Box mt={3}>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Admin can edit all employee details,
            including role, department,
            designation, contact information,
            profile photo, and joining date.
          </Typography>
        </Box>
 
      </DialogContent>
 
      <DialogActions>
        <Button
          variant="outlined"
          onClick={onClose}
        >
          Cancel
        </Button>
 
        <Button
          variant="contained"
          onClick={handleSave}
        >
          Save
        </Button>
      </DialogActions>
 
    </Dialog>
  );
};
 
export default EmployeeEditDialog;