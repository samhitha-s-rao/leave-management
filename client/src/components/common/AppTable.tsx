import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";


interface Column {
  field: string;
  headerName: string;
  align?: "left" | "center" | "right";
  render?: (row: any) => React.ReactNode;
}

interface AppTableProps {
  columns: Column[];
  rows: any[];
  noDataMessage?: string;
  getRowStyle?: (
    row: any
  ) => React.CSSProperties;
}

const AppTable = ({
  columns,
  rows,
  noDataMessage = "No records found",
  getRowStyle,
}: AppTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.field}
                align={column.align ?? "left"}
              >
                <b>{column.headerName}</b>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                align="center"
                colSpan={columns.length}
              >
                {noDataMessage}
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, index) => (
              <TableRow
                key={index}
                style={getRowStyle?.(row)}
                hover
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.field}
                    align={column.align ?? "left"}
                  >
                    {column.render
                      ? column.render(row)
                      : row[column.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AppTable;