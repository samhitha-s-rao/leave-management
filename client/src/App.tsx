import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import LeaveHistory from "./pages/LeaveHistory/LeaveHistory";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/leave-history"
        element={
          <ProtectedRoute>
            <LeaveHistory />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;