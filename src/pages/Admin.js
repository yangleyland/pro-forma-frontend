// src/Signup.js
import React, { useState } from "react";
import supabase from "../supabaseClient";
import { useDropzone } from "react-dropzone";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onDrop = (acceptedFiles) => {
    setCsvFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".csv",
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage("User created successfully!");
      if (csvFile) {
        await uploadCSVFile(data.user.id);
        navigate("/");
      }
    }
  };

  const uploadCSVFile = async (userId) => {
    const formData = new FormData();
    formData.append("file", csvFile);
    formData.append("userId", userId);

    try {
      const response = await fetch("http://localhost:3002/upload/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setMessage(`${result.message}`);

      const defaultControlsData = {
        id: userId,
        electrification_scenario: "",
        site: "",
        incentives: false,
        ira_incentives: false,
        phase1: 2024,
        phase2: 2025,
        phase3: 2026,
      };
      const defaultAdvancedControls = {
        id: userId,
        inflation: false,
        inflation_escalation_rate: 0.03,
        electricity_escalation_rate: 0.03,
        gasoline_escalation_rate: 0.03,
        infrastructure_loan_term: 10,
        infrastructure_loan_interest_rate: 0.03,
        discount_rate_npv: 0.03,
        maintenance_costs_annual_per_station: 0,
        charging_optimization: false,
        charging_optimization_savings: 0,
        charge_management_subscription_costs: 0,
        charger_network_costs: 0,
      };

      // Call the /api/controls endpoint with the default data
      const controlsResponse = await fetch(
        "http://localhost:3002/api/controls",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(defaultControlsData),
        }
      );
      const advancedControlRes = await fetch(
        "http://localhost:3002/api/advancedcontrols/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(defaultAdvancedControls),
        }
      );
      const chargerCostAdd = await fetch(
        `http://localhost:3002/api/chargerdata/add/${userId}`
      );

      if (!controlsResponse.ok || !advancedControlRes.ok || !chargerCostAdd.ok) {
        throw new Error("Failed to set data");
      }
    } catch (error) {
      setMessage(`Error uploading file: ${error.message}`);
    }
  };

  return (
    <div className="w-full h-full border flex justify-center items-center">
      <Card className="h-[500px] w-[500px] p-4">
        <CardHeader className="pb-5">
          <CardTitle>Pro Forma Account Addition</CardTitle>
          <CardDescription>Add Pro Forma Users Here</CardDescription>
          <p className="text-sm text-red-400">{message}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label>New Email</Label>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>New Password</Label>
                <Input
                  type="text"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div
                className="border border-4 rounded-md border-dashed p-5 hover:border-gray-400 text-center"
                {...getRootProps()}
              >
                <Input {...getInputProps()} />
                {csvFile ? (
                  <p>{csvFile.name}</p>
                ) : (
                  <p>Drag & Drop Vehicle CSV file here</p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Button type="submit">Create Account</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;
