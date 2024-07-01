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
import useAdvancedCalc from "../store/useAdvancedCalc";

function ResetButton({tableName}) {
  const { user, fetchData } = useAuthStore();
  const {setAdvancedCalcs} = useAdvancedCalc();

  const handleReset = async () => {
    if (!user) {
      return;
    }
    if (tableName === "advanced controls") {
      setAdvancedCalcs(null);
    }
    console.log("Resetting to default");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ROUTE}api/update-default?userId=${user.id}&tableName=${tableName}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(response);
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

        <Dialog>
          <DialogTrigger asChild>
            <Button  variant="outline" className="relative">Reset to default</Button>
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
  );
}

export default ResetButton;
