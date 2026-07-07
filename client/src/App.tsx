import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import ApplyLeave from "./pages/ApplyLeave/ApplyLeave";
import LeaveHistory from "./pages/LeaveHistory/LeaveHistory";
import Notification from "./pages/Notification/Notification";
import Profile from "./pages/Profile/Profile";
import ViewRequests from "./components/ViewRequests/ViewRequests";

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Login />}
      />
      

<Route path="/notification" element={<Notification />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/apply-leave" element={<ApplyLeave />} />
       <Route
        path="/leave-history"
        element={
          <ProtectedRoute>
            <LeaveHistory />
          </ProtectedRoute>
        }
      />
       <Route
        path="/Profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
       <Route
  path="/view-requests"
  element={
    <ProtectedRoute>
      <ViewRequests />
    </ProtectedRoute>
  }
/>

    </Routes>
  );
}

export default App;