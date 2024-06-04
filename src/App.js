import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import PositionListPage from "./pages/PositionListPage";
import LocationListPage from "./pages/LocationListPage";
import ReportListPage from "./pages/ReportListPage";
import UserListPage from "./pages/UserListPage";
import CheckpointListPage from "./pages/CheckpointListPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/positions" element={<PositionListPage />} />
        <Route path="/dashboard/locations" element={<LocationListPage />} />
        <Route path="/dashboard/checkpoints" element={<CheckpointListPage />} />
        <Route path="/dashboard/reports" element={<ReportListPage />} />
        <Route path="/dashboard/users" element={<UserListPage />} />
      </Routes>
    </>
  );
}

export default App;
