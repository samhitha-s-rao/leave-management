import { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { attendanceRows, summary } from "./attendenceData";


import { mockUsers } from "../../mock/users";

const AttendanceFilters = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(
    mockUsers[0]?.email || ""
  );

  const [department, setDepartment] = useState("All");

  const [location, setLocation] = useState("All");

  const handleSearch = () => {
    console.log({
      employee: selectedEmployee,
      department,
      location,
    });
  };

 const handleExport = () => {
  const exportData = attendanceRows.map((row) => ({
    Day: row.day,
    Status: row.status,
    "In Time": row.inTime,
    "Out Time": row.outTime,
    "Working Hours": row.workingHours,
    "OT Hours": row.otHours,
    Remarks: row.remarks,
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Attendance Report"
  );

  XLSX.writeFile(workbook, "Attendance_Report.xlsx");
};
  const handlePrint = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);

  doc.text("Attendance Report", 14, 15);

  doc.setFontSize(11);

  doc.text(
    `Generated : ${new Date().toLocaleDateString()}`,
    14,
    24
  );

  doc.text(
    `Present : ${summary.present}`,
    14,
    34
  );

  doc.text(
    `Leave : ${summary.leave}`,
    60,
    34
  );

  doc.text(
    `Absent : ${summary.absent}`,
    100,
    34
  );

  doc.text(
    `Half Day : ${summary.halfDay}`,
    140,
    34
  );

  autoTable(doc, {
    startY: 45,

    head: [[
      "Day",
      "Status",
      "In Time",
      "Out Time",
      "Working Hrs",
      "OT Hrs",
      "Remarks",
    ]],

    body: attendanceRows.map((row) => [
      row.day,
      row.status,
      row.inTime,
      row.outTime,
      row.workingHours,
      row.otHours,
      row.remarks,
    ]),
  });

  doc.save("Attendance_Report.pdf");
};
  return (
    <>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        flexWrap="wrap"
      >
        <Box>
          <Typography fontSize={30} fontWeight={700}>
            ATTENDANCE SUMMARY
          </Typography>

          <Typography color="gray">
            View attendance details for the selected month
          </Typography>
        </Box>

        <Box display="flex" gap={2} mt={{ xs: 2, md: 0 }}>
          {/* <Button
            variant="outlined"
            startIcon={<KeyboardArrowLeftIcon />}
            endIcon={<KeyboardArrowRightIcon />}
          >
            July 2026
          </Button> */}

          <Button
            variant="outlined"
            startIcon={<FileDownloadOutlinedIcon />}
            onClick={handleExport}
          >
            Export
          </Button>

          <Button
            variant="outlined"
            startIcon={<PrintOutlinedIcon />}
            onClick={handlePrint}
          >
            Print
          </Button>
        </Box>
      </Box>

      {/* Filters */}
      
    </>
  );
};

export default AttendanceFilters;