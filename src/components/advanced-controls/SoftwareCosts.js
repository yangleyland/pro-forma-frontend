import React, { forwardRef, useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import useAdvancedCalc from "../../store/useAdvancedCalc";
import ControlLabel from "./ControlLabel";
import { updateAdvancedControl } from "./advUtils";
import useAuthStore from "../../store/useAuthStore";

const SoftwareCosts = forwardRef((props, ref) => {
  const { advancedCalcs,setAdvancedCalcs } = useAdvancedCalc();
  const {user}=useAuthStore();

  const [formState, setFormState] = useState({
    charging_optimization: false,
    charging_optimization_savings: "",
    charge_management_subscription_costs: "",
    charger_network_costs: "",
  });

  useEffect(() => {
    if (advancedCalcs && advancedCalcs.charging_optimization_savings!=null) {
      setFormState({
        charging_optimization: advancedCalcs.charging_optimization ?? false,
        charging_optimization_savings:
          advancedCalcs.charging_optimization_savings ?? "",
        charge_management_subscription_costs:
          advancedCalcs.charge_management_subscription_costs ?? "",
        charger_network_costs: advancedCalcs.charger_network_costs ?? "",
      });
    }
  }, [advancedCalcs]);

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    console.log(e.target);
    setFormState((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
    try {
      let val = value;
      if (val.endsWith("%")) {
        val = val.slice(0, -1);
      }
      await updateAdvancedControl(user.id, { [name]: val },setAdvancedCalcs);
    } catch (error) {
      // Handle the error if needed
    }
  };

  const handleChange1 = async (e) => {
    const { name, value, type, checked } = e.target;
    console.log(name, value, type, checked );
    setFormState((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  const handleSwitchChange = async (checked) => {
    console.log("called")
    setFormState((prevState) => ({
      ...prevState,
      charging_optimization: checked,
    }));

    try {
      await updateAdvancedControl(user.id, { charging_optimization: checked },setAdvancedCalcs);
    } catch (error) {
      // Handle the error if needed
      console.error("Error updating advanced control:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <CardHeader  className="flex flex-col items-center">
        <CardTitle>Software Controls</CardTitle>
        <CardDescription>
        Modify software financial parameters for your charging stations
        </CardDescription>{" "}
      </CardHeader>
      <CardContent className="w-2/3">
        <form ref={ref}  onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <ControlLabel
                text="Charging Optimization"
                info="Toggles charging optimization"
              />
              <Switch
                checked={formState.charging_optimization}
                onCheckedChange={handleSwitchChange}
              />
              {/* Hidden input to include switch state in form data */}
              <input
                type="hidden"
                name="charging_optimization"
                value={formState.charging_optimization ? "true" : "false"}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <ControlLabel
                text="Charging Optimization Savings ($/vehicle)"
                info="Savings from charging optimization software"
              />
              <Input
                variant="blank"
                name="charging_optimization_savings"
                value={formState.charging_optimization_savings}
                onChange={handleChange1}
                onBlur={handleChange}
                type="text"
                placeholder=""
                disabled={!formState.charging_optimization}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <ControlLabel
                text="Charging Management Subscription Costs ($/yr)"
                info="Subscription cost"
              />

              <Input
                variant="blank"
                name="charge_management_subscription_costs"
                value={formState.charge_management_subscription_costs}
                onChange={handleChange1}
                onBlur={handleChange}
                type="number"
                placeholder=""
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <ControlLabel text="Charging Network Costs ($/yr)" info="Network cost" />
              <Input
                variant="blank"
                name="charger_network_costs"
                value={formState.charger_network_costs}
                onChange={handleChange1}
                onBlur={handleChange}
                type="number"
                placeholder=""
              />
            </div>
          </div>
        </form>
      </CardContent>
    </>
  );
});

SoftwareCosts.displayName = "SoftwareCosts";

export default SoftwareCosts;
