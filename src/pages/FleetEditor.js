import React from "react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import useAuthStore from "../store/useAuthStore";
import ResetButton from "../components/ResetButton";
import FleetGrid from "../components/fleet-grid/FleetGrid";

function FleetEditor() {
  const { user, fetchData } = useAuthStore();

  const handleReset = async () => {
    if (!user) {
      return;
    }
    console.log("Resetting to default");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ROUTE}api/reset-to-default/${user.id}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // API call successful, fetch the updated data
      await fetchData(user.id);

      // Add any additional logic here if needed
    } catch (error) {
      // Handle any errors that occurred during the API call
      console.error("Error resetting to default:", error);
    }
  };

  return (
    <div className="h-full">
      <div className="flex lg:flex-col lg:mb-4 items-center mb-4">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-normal lg:text-5xl text-optonygreen mr-9 lg:mr-0 font-franklin tracking-wide">
          Fleet Editor
        </h1>
        <ResetButton tableName="fleet data" />
      </div>
      <FleetGrid />
    </div>
  );
}

export default FleetEditor;
