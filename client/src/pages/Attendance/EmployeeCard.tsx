import {
  Avatar,
  Box,
  Card,
  Typography,
} from "@mui/material";
import type { EmployeeCardProps  } from "../../types";


const EmployeeCard = ({ user }: EmployeeCardProps) => {
  return (
    <Card
      sx={{
        p: 3,
        mb: 3,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Avatar
        // src={employee.image}
        sx={{
          width: 70,
          height: 70,
          mr: 3,
        }}
      />

      <Box>

        <Typography
          fontWeight="bold"
          fontSize={20}
        >
          {user.name} 
        </Typography>

        <Typography>
          {user.designation}
        </Typography>

        <Typography>
          {user.department}
        </Typography>

        <Typography mt={1}>
          Date of Joining :
          <b> {user.dateOfJoining}</b>
        </Typography>

      </Box>

    </Card>
  );
};

export default EmployeeCard;