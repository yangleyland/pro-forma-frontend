// src/pages/Dashboard.js
import React from "react";
import { useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import Calculations from "../components/Calculations";
import Controls from "../components/Controls";
import { Button } from "../components/ui/button";
import CostBenefitChart from "../components/CostBenefitChart";
import CostAndSavings from "../components/CostAndSavings";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

function Dashboard() {
  const { user, logout, data } = useAuthStore();

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
  if (!user) {
    return <div>Please log in</div>;
  }
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-bold tracking-normal lg:text-5xl text-optonygreen mb-4">
        Dashboard
      </h1>
      <div className="grid grid-cols-6 md:grid-cols-12 gap-4 p-4">
        <div className="col-span-3 h-fill">
          <Controls />
        </div>
        <div className="col-span-5 h-fill">
          <CostBenefitChart />
        </div>
        <div className="col-span-4 h-fill">
          <CostAndSavings />
        </div>
      </div>

      {/* <Calculations /> */}
    </div>
  );
}

export default Dashboard;
