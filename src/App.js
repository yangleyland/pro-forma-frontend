import "./App.css";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import FleetEditor from "./pages/FleetEditor";
import useAllSitesYearOverYear from "./store/useAllSitesYearOverYear";
import useAdvancedCalc from "./store/useAdvancedCalc";
import useProFormaCalcs from "./store/useProFormaCalcs";
import useAllSitesCalcs from "./store/useAllSitesCalcs";
import SetDefaults from "./pages/SetDefaults";

const MainLayout = ({ children }) => {
  const { user, loading } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {

    if (!user && !loading) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  return (
    <div className="flex w-full">
      <div className="w-1/6 z-50">
        <Navbar />
      </div>
      <div className="w-5/6 p-10">{children}</div>
    </div>
  );
};

function App() {
  const { initializeAuth, user, controlsData,loading,data } = useAuthStore();
  const { filterPhases, filteredPhases,phases } = usePhases();
  const { initializeYears,START_YEAR,END_YEAR } = useYears();
  const { initYearOverYear } = useYearOverYear();
  const {initYearOverYear:initAllSites } = useAllSitesYearOverYear();
  const {advancedCalcs} = useAdvancedCalc();
  const {setYearSums} = useProFormaCalcs();
  const {setYearSums:setYearSumsAllSites} = useAllSitesCalcs();

      
  useEffect(() => {
    if (data.length > 0){
      initializeYears();
    }
  }, [initializeYears,START_YEAR,END_YEAR,data,phases]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);


  useEffect(() => {
    
    if (!loading && controlsData){
      filterPhases();
      setYearSums();
      setYearSumsAllSites();
    }
  }, [controlsData,advancedCalcs,data,loading,setYearSums,setYearSumsAllSites,filterPhases]);


  useEffect(() => {
    if (user && controlsData) {
      initYearOverYear();
      initAllSites();
    }
  }, [filteredPhases, user, controlsData,initYearOverYear,initAllSites]);

  return (
    <div className="flex h-screen">
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route
          path="/advanced-controls"
          element={
            <MainLayout>
              <AdvancedControls />
            </MainLayout>
          }
        />
        <Route
          path="/phases"
          element={
            <MainLayout>
              <Phases />
            </MainLayout>
          }
        />
        <Route
          path="/yearoveryear"
          element={
            <MainLayout>
              <YearOverYear />
            </MainLayout>
          }
        />
        <Route
          path="/fleet-editor"
          element={
            <MainLayout>
              <FleetEditor />
            </MainLayout>
          }
        />
        <Route
          path="/set-defaults"
          element={
            <MainLayout>
              <SetDefaults />
            </MainLayout>
          }
        />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
