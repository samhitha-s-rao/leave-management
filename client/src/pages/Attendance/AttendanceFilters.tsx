import {
  Box,
  Typography,
  Button,
} from "@mui/material";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import type { MonthlyAttendance } from "../../api/attendanceApi";

interface AttendanceFiltersProps {
  attendance: MonthlyAttendance;
}

const AttendanceFilters = ({
  attendance,
}: AttendanceFiltersProps) => {

  const handleExport = () => {

    const exportData =
      attendance.attendance.map((item) => ({
        Date: new Date(
          item.attendanceDate
        ).toLocaleDateString(),

        "Check In": item.checkInTime ?? "-",

        "Check Out": item.checkOutTime ?? "-",

        "Working Hours":
          item.workingHours,

        Status: item.checkInTime
          ? "Present"
          : "Absent",
      }));

    const worksheet =
      XLSX.utils.json_to_sheet(exportData);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Attendance"
    );

    XLSX.writeFile(
      workbook,
      "Attendance_Report.xlsx"
    );
  };

  const handlePrint = () => {

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
      "Attendance Report",
      14,
      18
    );

    doc.setFontSize(11);

    doc.text(
      `Present : ${attendance.present}`,
      14,
      30
    );

    doc.text(
      `Absent : ${attendance.absent}`,
      60,
      30
    );

    doc.text(
      `Leave : ${attendance.leave}`,
      100,
      30
    );

    autoTable(doc, {
      startY: 40,

      head: [[
        "Date",
        "Status",
        "Check In",
        "Check Out",
        "Working Hours",
      ]],

      body:
        attendance.attendance.map(
          (item) => [
            new Date(
              item.attendanceDate
            ).toLocaleDateString(),

            item.checkInTime
              ? "Present"
              : "Absent",

            item.checkInTime ??
              "-",

            item.checkOutTime ??
              "-",

            item.workingHours,
          ]
        ),
    });

    doc.save(
      "Attendance_Report.pdf"
    );
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        flexWrap="wrap"
      >
        <Box>

          <Typography
            fontSize={30}
            fontWeight={700}
          >
            ATTENDANCE SUMMARY
          </Typography>

          <Typography color="gray">
            View attendance details
          </Typography>

        </Box>

        <Box
          display="flex"
          gap={2}
          mt={{
            xs: 2,
            md: 0,
          }}
        >

          <Button
            variant="outlined"
            startIcon={
              <FileDownloadOutlinedIcon />
            }
            onClick={handleExport}
          >
            Export
          </Button>

          <Button
            variant="outlined"
            startIcon={
              <PrintOutlinedIcon />
            }
            onClick={handlePrint}
          >
            Print
          </Button>

        </Box>
      </Box>
    </>
  );
};

export default AttendanceFilters;