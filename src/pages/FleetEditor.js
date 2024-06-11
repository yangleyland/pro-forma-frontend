import React from "react";
import { FleetTable } from "../components/fleet-editor/FleetTable";
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

function FleetEditor() {
  const { user, fetchData } = useAuthStore();

  const handleReset = async () => {
    if (!user) {
      return;
    }
    console.log("Resetting to default");
    try {
      const response = await fetch(
        `http://localhost:3002/api/reset-to-default/${user.id}`,
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
    <div>
      <div className="flex gap-9">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-normal lg:text-5xl text-optonygreen mb-4">
          Fleet Editor
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="relative top-2">Reset to default</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Are you sure you want to do this?</DialogTitle>
              <DialogDescription>
                Resetting to default will lose all changes in the fleet editor.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
              </div>
            </div>
            <DialogFooter className="">
              <DialogClose asChild>
                <Button onClick={handleReset} type="submit">
                  Reset
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <FleetTable />
    </div>
  );
}

export default FleetEditor;
