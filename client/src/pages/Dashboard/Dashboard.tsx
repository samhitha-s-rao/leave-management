import { useState } from "react";
import { Button } from "@mui/material";
import "./Dashboard.css";
import Cards from "../../components/Card/Card";

const Dashboard = () => {
  const user =
    JSON.parse(localStorage.getItem("user") || "null") ||
    JSON.parse(sessionStorage.getItem("user") || "null");
const [isCheckedIn, setIsCheckedIn] = useState(
    localStorage.getItem("isCheckedIn") === "true"
  );

  if (!user) return null;

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    localStorage.setItem("isCheckedIn", "true");
    alert("Checked In Successfully");
  };

  const handleCheckOut = () => {
    setIsCheckedIn(false);
    localStorage.setItem("isCheckedIn", "false");
    alert("Checked Out Successfully");
  };

  if (!user) return null;

  return (
    <div className="dashboard">
     <div className="dashboard-content">
        <div className="card">
          <div className="dashboard-header">
  <div className="user-info">
    <h2>Welcome, {user.name}</h2>
    <h3>Role: {user.role}</h3>
  </div>

  <div className="attendance-actions">
    <Button
      variant="contained"
      className="checkin-btn"
      onClick={handleCheckIn}
      disabled={isCheckedIn}
    >
      Check In
    </Button>

    <Button
      variant="contained"
      className="checkout-btn"
      onClick={handleCheckOut}
      disabled={!isCheckedIn}
    >
      Check Out
    </Button>
  </div>
</div>

<Cards role={user.role} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;