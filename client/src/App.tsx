import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import ApplyLeave from "./pages/ApplyLeave/ApplyLeave";
import LeaveHistory from "./pages/LeaveHistory/LeaveHistory";
import Notification from "./pages/Notification/Notification";
import Profile from "./pages/Profile/Profile";
import CompanyCalendar from "./pages/CompanyCalendar/CompanyCalendar";
import ViewRequests from "./components/ViewRequests/ViewRequests";
import Attendance from "./pages/Attendance/Attendance";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import LeaveSettings from "./pages/LeaveSettings/LeaveSettings";
import EmployeeAttendance from "./pages/EmployeeAttendance/EmployeeAttendance";
import EmployeeList from "./pages/EmployeeList/EmployeeList";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/apply-leave" element={<ApplyLeave />} />
        <Route path="/leave-history" element={<LeaveHistory />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route
  path="/employee-attendance"
  element={<EmployeeAttendance />}
/>
        <Route path="/company-calendar" element={<CompanyCalendar />} />
        <Route path="/view-requests" element={<ViewRequests />} />
        <Route path="/leave-settings" element={<LeaveSettings />} />
        <Route path="/employee-list" element={<EmployeeList />} />
      </Route>
    </Routes>
  );
}

export default App;