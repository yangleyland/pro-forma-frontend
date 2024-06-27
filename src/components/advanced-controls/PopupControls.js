import { useRef } from "react";
import Economics from "./Economics";
import SoftwareCosts from "./SoftwareCosts";
import { Button } from "../ui/button";
import useAuthStore from "../../store/useAuthStore";
import useAdvancedCalc from "../../store/useAdvancedCalc";
import useYearOverYear from "../../store/useYearOverYear";
import useProFormaCalcs from "../../store/useProFormaCalcs";
import ResetButton from "../ResetButton";
import { Card } from "../ui/card";
import { GearIcon } from "@radix-ui/react-icons";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";

function PopupControls({ tableName }) {
  const economicsRef = useRef(null);
  const softwareCostsRef = useRef(null);
  const { user, fetchData } = useAuthStore();
  const { fetchAdvancedCalcs } = useAdvancedCalc();

  const handleSubmit = async () => {
    const economicsData = new FormData(economicsRef.current);
    const softwareCostsData = new FormData(softwareCostsRef.current);
    const data = {};

    economicsData.forEach((value, key) => {
      data[key] = value;
    });
    softwareCostsData.forEach((value, key) => {
      data[key] = value;
    });
    data["id"] = user.id;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ROUTE}api/advancedcontrols`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      await fetchAdvancedCalcs(user.id);
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const handleReset = async () => {
    if (!user) {
      return;
    }
    console.log("Resetting to default");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ROUTE}api/update-default?userId=${user.id}&tableName=${"advanced controls"}`,
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="relative top-2">
          Advanced Controls
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-md max-h-[80vh] overflow-y-auto p-4"
        showCloseButton={false}
      >
        <div className="space-y-4">
          <DialogClose asChild>
            <Button className="w-full" onClick={handleSubmit}>
              Apply Changes
            </Button>
            
          </DialogClose>
          <Button variant="outline" className="w-full" onClick={handleReset} type="submit">
              Reset to Default
            </Button>
          <Economics update={handleSubmit} ref={economicsRef} />
          <SoftwareCosts update={handleSubmit} ref={softwareCostsRef} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PopupControls;
