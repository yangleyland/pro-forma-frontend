import "./App.css";
import { useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Login from "./pages/Login.js";
import Dashboard from "./pages/Dashboard.js";
import AdvancedControls from "./pages/AdvancedControls.js";
import Admin from "./pages/Admin.js";
import useAuthStore from "./store/useAuthStore.js";
import Phases from "./pages/Phases.js";
import YearOverYear from "./pages/YearOverYear.js";
import usePhases from "./store/usePhases.js";
import useYearOverYear from "./store/useYearOverYear.js";
import useYears from "./store/useYears.js";
import Navbar from "./components/Navbar";

function App() {
  const { initializeAuth, user } = useAuthStore();
  const { fetchPhases } = usePhases();
  const { initializeYears } = useYears();
  useEffect(() => {
    initializeYears();
  }, [initializeYears]);
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);
  useEffect(() => {
    if (user) {
      fetchPhases(user.id);
    }
  }, [user, fetchPhases]);

  return (
    <div className="flex h-screen">
      <Navbar />

      <div className="flex-1">
        <div className="flex">
          <div className="w-1/6 z-50">
            <Navbar />
          </div>
          <div className="w-5/6  p-10">
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/advanced-controls" element={<AdvancedControls />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/phases" element={<Phases />} />
              <Route path="/yearoveryear" element={<YearOverYear />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
