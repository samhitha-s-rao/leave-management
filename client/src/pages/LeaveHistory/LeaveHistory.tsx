import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Button,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import { getMyLeaves } from "../../services/leaveService";
import type { LeaveHistory} from "../../types";
import AppTable from "../../components/common/AppTable";

// const employeeHistory = [
//   {
//     employee: "John",
//     role: "Employee",
//     type: "Casual Leave",
//     from: "10-Jul-2026",
//     to: "12-Jul-2026",
//     status: "Approved",
//   },
//   {
//     employee: "David",
//     role: "Manager",
//     type: "Sick Leave",
//     from: "15-Jul-2026",
//     to: "16-Jul-2026",
//     status: "Pending",
//   },
// ];


const LeaveHistory = () => {
  const navigate = useNavigate();

  const [myLeaveHistory, setMyLeaveHistory] = useState<LeaveHistory[]>([]);


  const user =
    JSON.parse(localStorage.getItem("user") || "null") ||
    JSON.parse(sessionStorage.getItem("user") || "null");


  useEffect(() => {
    loadLeaveHistory();
  }, []);


  const loadLeaveHistory = async () => {
    try {
      const response = await getMyLeaves();
      setMyLeaveHistory(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load leave history.");
    }
  };


  if (!user) return null;


  const exportToExcel = () => {
    let data: unknown[] = [];


    // Employee / Manager / Admin own leave history
    data = myLeaveHistory.map((leave) => ({
      "Request ID": leave.leaveRequestId,
      "Leave Type": leave.leaveTypeName,
      From: new Date(leave.startDate).toLocaleDateString(),
      To: new Date(leave.endDate).toLocaleDateString(),
      Days: leave.numberOfDays,
      Status: leave.status,
    }));


    /*
    Employee Leave History export
    Enable after backend API is available.

    if(user.role === "Manager" || user.role === "Admin"){
       data = employeeHistory.map((leave)=>({
          Employee: leave.employee,
          Role: leave.role,
          "Leave Type": leave.type,
          From: leave.from,
          To: leave.to,
          Status: leave.status
       }))
    }
    */


    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Leave History"
    );

    XLSX.writeFile(workbook, "Leave_History.xlsx");
  };


  return (
    <Box sx={{ p: 4 }}>

      <Button
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        sx={{ mb: 3 }}
        onClick={() => navigate("/dashboard")}
      >
        Back
      </Button>


      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          mb: 4,
        }}
      >

        <Typography variant="h4">
          Leave History
        </Typography>


        <Button
          variant="contained"
          color="primary"
          onClick={exportToExcel}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            px: 3,
          }}
        >
          Export
        </Button>

      </Box>



      {/* Employee */}

      {user.role === "Employee" && (
        <>
          <Typography variant="h5" mb={2}>
            My Leave History
          </Typography>


          <TableContainer component={Paper}>
            <Table>

              <TableHead>
                <TableRow>

                  <TableCell>
                    <b>Request ID</b>
                  </TableCell>

                  <TableCell>
                    <b>Leave Type</b>
                  </TableCell>

                  <TableCell>
                    <b>From</b>
                  </TableCell>

                  <TableCell>
                    <b>To</b>
                  </TableCell>

                  <TableCell>
                    <b>Days</b>
                  </TableCell>

                  <TableCell>
                    <b>Status</b>
                  </TableCell>

                </TableRow>
              </TableHead>


              <TableBody>

                {myLeaveHistory.map((leave) => (

                  <TableRow key={leave.leaveRequestId}>

                    <TableCell>
                      {leave.leaveRequestId}
                    </TableCell>


                    <TableCell>
                      {leave.leaveTypeName}
                    </TableCell>


                    <TableCell>
                      {new Date(
                        leave.startDate
                      ).toLocaleDateString()}
                    </TableCell>


                    <TableCell>
                      {new Date(
                        leave.endDate
                      ).toLocaleDateString()}
                    </TableCell>


                    <TableCell>
                      {leave.numberOfDays}
                    </TableCell>


                    <TableCell>

                      <Chip
                        label={leave.status}
                        color={
                          leave.status === "Approved"
                            ? "success"
                            : leave.status === "Pending"
                            ? "warning"
                            : "error"
                        }
                      />

                    </TableCell>


                  </TableRow>

                ))}

              </TableBody>


            </Table>
          </TableContainer>

        </>
      )}




      {/* Manager & Admin */}

      {(user.role === "Manager" || user.role === "Admin") && (

        <>

          <Typography variant="h5" mb={2}>
            My Leave History
          </Typography>


          <TableContainer component={Paper}>

            <Table>

              <TableHead>

                <TableRow>

                  <TableCell>
                    <b>Request ID</b>
                  </TableCell>

                  <TableCell>
                    <b>Leave Type</b>
                  </TableCell>

                  <TableCell>
                    <b>From</b>
                  </TableCell>

                  <TableCell>
                    <b>To</b>
                  </TableCell>

                  <TableCell>
                    <b>Days</b>
                  </TableCell>

                  <TableCell>
                    <b>Status</b>
                  </TableCell>

                </TableRow>

              </TableHead>


              <TableBody>


                {myLeaveHistory.map((leave)=>(

                  <TableRow key={leave.leaveRequestId}>


                    <TableCell>
                      {leave.leaveRequestId}
                    </TableCell>


                    <TableCell>
                      {leave.leaveTypeName}
                    </TableCell>


                    <TableCell>
                      {new Date(
                        leave.startDate
                      ).toLocaleDateString()}
                    </TableCell>


                    <TableCell>
                      {new Date(
                        leave.endDate
                      ).toLocaleDateString()}
                    </TableCell>


                    <TableCell>
                      {leave.numberOfDays}
                    </TableCell>


                    <TableCell>

                      <Chip
                        label={leave.status}
                        color={
                          leave.status === "Approved"
                          ? "success"
                          : leave.status === "Pending"
                          ? "warning"
                          : "error"
                        }
                      />

                    </TableCell>


                  </TableRow>

                ))}


              </TableBody>


            </Table>

          </TableContainer>





          {/*
          
          Employee Leave History

          Enable after backend API:
          GET /api/Leave/history


          <Typography variant="h5" mb={2}>
            Employee Leave History
          </Typography>


          <TableContainer component={Paper}>
             Employee history table here
          </TableContainer>

          */}


        </>

      )}

    </Box>
  );
};


export default LeaveHistory;