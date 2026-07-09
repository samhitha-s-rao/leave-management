import "./Attendance.css";

import AttendanceFilters from "./AttendanceFilters";
import EmployeeCard from "./EmployeeCard";
import AttendanceSummary from "./AttendanceSummary";
import AttendanceTable from "./AttendanceTable";
import AttendanceLegend from "./AttendanceLegend";
import { mockUsers } from "../../mock/users";


const Attendance = () => {
 
const currentUser =
  JSON.parse(localStorage.getItem("user") || "null") ||
  JSON.parse(sessionStorage.getItem("user") || "null");
const loggedInUser =
  mockUsers.find(
    (user) => user.email === currentUser?.email
  ) || mockUsers[0];
    return (

        <div className="attendance-page">

            <AttendanceFilters />

            <EmployeeCard user={loggedInUser} />

            <AttendanceSummary />

            <AttendanceTable />

            <AttendanceLegend />

        </div>

    );

};

export default Attendance;