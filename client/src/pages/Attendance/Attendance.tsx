import { useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import { mockUsers } from "../../mock/users";
import "./Attendance.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const employees = mockUsers;


const Attendance = () => {
   const navigate = useNavigate();
  const [attendance, setAttendance] = useState<Record<number, string>>({});


  const handleAttendanceChange = (
    id: number,
    value: string
  ) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSave = () => {
    console.log(attendance);

    alert("Attendance saved successfully (Mock)");
  };

  return (
  <Paper elevation={2} className="attendance-card">
     <Button
  startIcon={<ArrowBackIcon />}
  variant="outlined"
  sx={{ mb: 2 }}
  onClick={() => navigate("/dashboard")}
>
</Button>

    <div className="attendance-header">

      <div>
        <Typography variant="h4" className="attendance-title">
          Attendance
        </Typography>

        <Typography className="attendance-subtitle">
          Mark attendance for employees
        </Typography>
      </div>

      <Typography className="attendance-date">
        {new Date().toLocaleDateString()}
      </Typography>

    </div>

    <TableContainer>

      <Table>

        <TableHead className="attendance-table-head">

          <TableRow>

            <TableCell><b>Employee ID</b></TableCell>

            <TableCell><b>Employee Name</b></TableCell>

            <TableCell><b>Department</b></TableCell>

            <TableCell><b>Status</b></TableCell>

            <TableCell align="center">
              <b>Attendance</b>
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {employees.map((employee) => (

            <TableRow
              key={employee.id}
              hover
            >

              <TableCell>
                EMP{String(employee.id).padStart(3, "0")}
              </TableCell>

              <TableCell>
                {employee.name}
              </TableCell>

              <TableCell>
                {employee.department}
              </TableCell>

              <TableCell>

                {attendance[employee.id] ? (

                  <span
                    className={
                      attendance[employee.id] === "Present"
                        ? "status-present"
                        : "status-absent"
                    }
                  >
                    {attendance[employee.id]}
                  </span>

                ) : (

                  <span className="status-pending">
                    Not Marked
                  </span>

                )}

              </TableCell>

              <TableCell align="center">

                <RadioGroup
                  row
                  value={attendance[employee.id] || ""}
                  onChange={(e) =>
                    handleAttendanceChange(
                      employee.id,
                      e.target.value
                    )
                  }
                >

                  <FormControlLabel
                    value="Present"
                    control={<Radio />}
                    label="Present"
                  />

                  <FormControlLabel
                    value="Absent"
                    control={<Radio />}
                    label="Absent"
                  />

                </RadioGroup>

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </TableContainer>

    <div className="attendance-btn">

      <Button
        variant="contained"
        onClick={handleSave}
      >
        Save Attendance
      </Button>

    </div>

  </Paper>
);
};
export default Attendance;