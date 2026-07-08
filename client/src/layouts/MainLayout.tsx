import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import { useState } from "react";

const MainLayout = () => {
  const user =
    JSON.parse(localStorage.getItem("user") || "null") ||
    JSON.parse(sessionStorage.getItem("user") || "null");

  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <>
     
      <Navbar />
      <div
        style={{
          display: "flex",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Sidebar
          userRole={user.role}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />

        <div
          style={{
            flex: 1,
            padding: "25px",
            background: "#f5f7fa",
          }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;