import { useState } from "react";
import "./Dashboard.css";
import "../../mock/users.tsx";
import Cards from "../../components/Card/Card";
import Sidebar from "../../components/Sidebar/Sidebar";


const Dashboard = () => {
  const user =
    JSON.parse(localStorage.getItem("user") || "null") ||
    JSON.parse(sessionStorage.getItem("user") || "null");

  const [activeItem, setActiveItem] = useState("Dashboard");

  if (!user) return null;

  return (
    <div className="dashboard">
      <h1> Leave Management System</h1>

      <div className="dashboard-content">
    <Sidebar
      userRole={user.role}
      activeItem={activeItem}
      setActiveItem={setActiveItem}
    />

        {/* Your existing card remains unchanged */}
        <div className="card">
          <h2>Welcome, {user.name}</h2>

          <h3>Role : {user.role}</h3>

          <Cards role={user.role} />

          <br />

          {user.role === "Admin" && (
            <>
              {/* <h4>Admin Dashboard</h4>

            <ul>
              <li>Manage Employees</li>
              <li>Assign Managers</li>
              <li>View Reports</li>
            </ul> */}

            </>
          )}

          {user.role === "Manager" && (
            <>
              {/* <h4>Manager Dashboard</h4>

            <ul>
              <li>Approve Leave Requests</li>
              <li>View Team Leave Balance</li>
              <li>View Attendance</li>
            </ul> */}

            </>
          )}

          {user.role === "Employee" && (
            <>
              {/* <h4>Employee Dashboard</h4>

              <ul>
                <li>Apply Leave</li>
                <li>View Leave Balance</li>
                <li>Track Leave Status</li>
              </ul> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;