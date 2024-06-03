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


function App() {
  const { initializeAuth,user } = useAuthStore();
  const {fetchPhases} = usePhases();
  const {initializeYears} = useYears();
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
    <div>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/advanced-controls">Advanced Controls</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
            <li>
              <Link to="/phases">Phases</Link>
            </li>
            <li>
              <Link to="/yearoveryear">Year Over Year</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/advanced-controls" element={<AdvancedControls />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/phases" element={<Phases />} />
        <Route path="/yearoveryear" element={<YearOverYear />} />
      </Routes>
    </div>
  );
}

export default App;
