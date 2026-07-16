import "./Card.css";
import { useEffect, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import type { CardProps } from "../../types";

import { getMyLeaveBalance } from "../../api/leaveBalanceApi";

const Cards = ({ role }: CardProps) => {
  const [balances, setBalances] = useState({
    casual: 0,
    earned: 0,
    sick: 0,
    wfh: 0,
  });

  useEffect(() => {
    const loadBalances = async () => {
      try {
        const data = await getMyLeaveBalance();

        setBalances({
          casual:
            data.find(
              (x: any) => x.leaveTypeId === 1
            )?.remainingLeaves ?? 0,

          sick:
            data.find(
              (x: any) => x.leaveTypeId === 2
            )?.remainingLeaves ?? 0,

          earned:
            data.find(
              (x: any) => x.leaveTypeId === 3
            )?.remainingLeaves ?? 0,

          wfh:
            data.find(
              (x: any) => x.leaveTypeId === 4
            )?.remainingLeaves ?? 0,
        });
      } catch (error) {
        console.error(
          "Failed to load leave balances",
          error
        );
      }
    };

    loadBalances();
  }, []);

  return (
    <Box className="employeeCards">
      {/* Casual Leave Card */}
      <Card className="dashboardCard">
        <CardContent>
          <Box className="cardHeader">
            <Typography variant="h6">
              Casual Leaves
            </Typography>

            <EventAvailableIcon color="primary" />
          </Box>

          <Typography
            variant="h3"
            color="primary"
            sx={{ mt: 3 }}
          >
            {balances.casual}
          </Typography>

          <Typography color="text.secondary">
            Available
          </Typography>
        </CardContent>
      </Card>

      {/* Earned Leave Card */}
      <Card className="dashboardCard">
        <CardContent>
          <Box className="cardHeader">
            <Typography variant="h6">
              Earned Leaves
            </Typography>

            <EventAvailableIcon color="primary" />
          </Box>

          <Typography
            variant="h3"
            color="primary"
            sx={{ mt: 3 }}
          >
            {balances.earned}
          </Typography>

          <Typography color="text.secondary">
            Available
          </Typography>
        </CardContent>
      </Card>

      {/* Sick Leave Card */}
      <Card className="dashboardCard">
        <CardContent>
          <Box className="cardHeader">
            <Typography variant="h6">
              Sick Leaves
            </Typography>

            <EventAvailableIcon color="primary" />
          </Box>

          <Typography
            variant="h3"
            color="primary"
            sx={{ mt: 3 }}
          >
            {balances.sick}
          </Typography>

          <Typography color="text.secondary">
            Available
          </Typography>
        </CardContent>
      </Card>

      {/* Employee Only */}
      {role === "Employee" && (
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
      )}
    </Box>
  );
};

export default Cards;