// src/pages/Dashboard.js
import React from "react";
import { useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import Calculations from "../components/Calculations";

function Dashboard() {
  const { user, logout, initializeAuth, data } =
    useAuthStore();
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);


  const renderTable = () => {
    if (data.length === 0) {
      return <p>No data available</p>;
    }

    const headers = Object.keys(data[0]);
    return (
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={header}>{item[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  if (!user) {
    return <div>Please log in</div>;
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>
      <p>Welcome to the dashboard!</p>
      <p>UID: {user.id}</p>
      <p>Email: {user.email}</p>
      {renderTable()}
      <Calculations/>
    </div>
  );
}

export default Dashboard;
