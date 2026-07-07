import "./Card.css";

import { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface CardProps {
  role: string;
}

const rows = [
  {
    employee: "EMP001",
    remaining: 12,
    approved: 5,
    pending: 2,
    rejected: 1,
  },
  {
    employee: "EMP002",
    remaining: 10,
    approved: 4,
    pending: 1,
    rejected: 0,
  },
  {
    employee: "EMP003",
    remaining: 8,
    approved: 6,
    pending: 1,
    rejected: 2,
  },
];

const Cards = ({ role }: CardProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

 

  if (role === "Employee") {
    return (
      <Box className="employeeCards">
        <Card className="dashboardCard">
          <CardContent>
            <Box className="cardHeader">
              <Typography variant="h6">
                Leave Balance
              </Typography>

              <EventAvailableIcon color="primary" />
            </Box>

            <Typography
              variant="h3"
              color="primary"
              sx={{ mt: 3 }}
            >
              12
            </Typography>

            <Typography color="text.secondary">
              Days Remaining
            </Typography>
          </CardContent>
        </Card>

        <Card className="dashboardCard">
          <CardContent>
            <Typography variant="h6">
              Apply Leave
            </Typography>

            <Typography sx={{ mt: 2 }}>
              Click below to submit a leave request.
            </Typography>

            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              sx={{ mt: 3 }}
            >
              Apply Leave
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box className="tableContainer">
      <Typography
        variant="h5"
        sx={{ mb: 2 }}
      >
        Employee Leave Summary
      </Typography>

      <TableContainer component={Paper}>
        <Table>

          <TableHead>
            <TableRow>

              <TableCell>
                <b>Employee</b>
              </TableCell>

              <TableCell align="center">
                <b>Remaining</b>
              </TableCell>

              <TableCell align="center">
                <b>Approved</b>
              </TableCell>

              <TableCell align="center">
                <b>Pending</b>
              </TableCell>

              <TableCell align="center">
                <b>Rejected</b>
              </TableCell>

              <TableCell align="center">
                <b>Action</b>
              </TableCell>

            </TableRow>
          </TableHead>

          <TableBody>

            {rows.map((row) => (
              <TableRow key={row.employee}>

                <TableCell>{row.employee}</TableCell>

                <TableCell align="center">
                  {row.remaining}
                </TableCell>

                <TableCell align="center">
                  {row.approved}
                </TableCell>

                <TableCell align="center">
                  {row.pending}
                </TableCell>

                <TableCell align="center">
                  {row.rejected}
                </TableCell>

                <TableCell align="center">

                  {role === "Manager" ? (
                    <>
                      <IconButton onClick={handleClick}>
                        <MoreVertIcon />
                      </IconButton>

                      <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleClose}>
                          Approve
                        </MenuItem>

                        <MenuItem onClick={handleClose}>
                          Reject
                        </MenuItem>

                        <MenuItem onClick={handleClose}>
                          Comment
                        </MenuItem>

                      </Menu>
                    </>
                  ) : (
                    <Button variant="outlined">
                      Manage
                    </Button>
                  )}

                </TableCell>

              </TableRow>
            ))}

          </TableBody>

        </Table>
      </TableContainer>
    </Box>
  );
};

export default Cards;