// src/pages/Dashboard.js
import React from "react";
import { useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import Calculations from "../components/Calculations";
import Controls from "../components/Controls";
import { Button } from "../components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"


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
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-optonygreen mb-4">
        Dashboard
      </h1>
      <Controls />
      <Button onClick={logout}>Logout</Button>
      {renderTable()}
      <Calculations />
    </div>
  );
}

export default Dashboard;
