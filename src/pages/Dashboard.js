// src/pages/Dashboard.js
import React, { useEffect } from "react";
import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import Calculations from "../components/Calculations";
import Controls from "../components/dashboard/Controls";
import { Button } from "../components/ui/button";
import CostBenefitChart from "../components/dashboard/CostBenefitChart";
import CostAndSavings from "../components/dashboard/CostAndSavings";
import { useNavigate } from "react-router-dom";
import GHGReductionsGraph from "../components/dashboard/GHGReductionsGraph";
import GHGReductions from "../components/dashboard/GHGReductions";
import Timeline from "../components/dashboard/Timeline";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import ElectrificationScenario from "../components/dashboard/ElectrificationScenario";
import PrioritySite from "../components/PrioritySite";
import CashFlow from "../components/dashboard/CashFlow";
import CapitalCostsGraph from "../components/dashboard/CapitalCostsGraph";

function Dashboard() {
  const { user, logout, data, loading, initializeAuth } = useAuthStore();
  const navigate = useNavigate();
  const [renderKey, setRenderKey] = useState(0);

  const renderTable = () => {
    if (data.length === 0) {
      return <p>No data available</p>;
    }

    const headers = Object.keys(data[0]);
    return (
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              {headers.map((header) => (
                <td key={header}>{item[header]}</td>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-bold tracking-normal lg:text-5xl text-optonygreen mb-4">
        Dashboard
      </h1>

      <div className="grid grid-cols-6 md:grid-cols-12 gap-4 p-4">
        

        
        <div className="col-span-3 h-fill">
          <Controls />
        </div>
        <div className="col-span-5 row-span-1 h-fill">
          <CostBenefitChart />
        </div>
        <div className="col-span-4  row-span-1 h-fill">
          <CostAndSavings key={renderKey} />
        </div>
        
        <div className="col-span-3 row-span-1 h-fill">
          <PrioritySite />
        </div>
        <div className="col-span-3  row-span-1 h-fill">
          <ElectrificationScenario />
        </div>
        <div className="col-span-3  row-span-1 h-fill">
          <GHGReductions />
        </div>
        <div className="col-span-3  row-span-1 h-fill">
          <CashFlow />
        </div>
        <div className="col-span-4 row-span-1 h-full">
          <GHGReductionsGraph />
        </div>
        <div className="col-span-4 row-span-1 h-full">
          <CapitalCostsGraph />
        </div>
        <div className="col-span-4 row-span-1 h-full">
          <Timeline />
        </div>
        {/* <div className="col-span-3 row-span-1 flex gap-4 flex-col h-full justify-between">
          <GHGReductions />
          <PrioritySite />
        </div>

        <div className="col-span-3 row-span-1 flex gap-4 flex-col h-full justify-between">
          <ElectrificationScenario />
          <CashFlow />
        </div> */}
        
      </div>

      {/* <Calculations /> */}
    </div>
  );
}

export default Dashboard;
