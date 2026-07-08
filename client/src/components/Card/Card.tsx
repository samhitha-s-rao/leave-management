import "./Card.css";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import type {  CardProps } from "../../types";

// interface CardProps {
//   role: string;
// }

const leaveData = {
  Employee: {
    casual: 6,
    earned: 14,
  },
  Manager: {
    casual: 8,
    earned: 18,
  },
  Admin: {
    casual: 10,
    earned: 20,
  },
};

const Cards = ({ role }: CardProps) => {
  const data = leaveData[role as keyof typeof leaveData];

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
            {data.casual}
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
            {data.earned}
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