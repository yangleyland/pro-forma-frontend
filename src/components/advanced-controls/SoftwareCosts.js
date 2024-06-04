import React, { forwardRef, useState ,useEffect} from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import useAdvancedCalc from "../../store/useAdvancedCalc";


const SoftwareCosts = forwardRef((props, ref) => {
    const { advancedCalcs } = useAdvancedCalc();

  const [formState, setFormState] = useState({
    charging_optimization: false,
    charging_optimization_savings: "",
    charge_management_subscription_costs: "",
    charger_network_costs: ""
  });

  useEffect(() => {
    if (advancedCalcs) {
      setFormState({
        charging_optimization: advancedCalcs.charging_optimization || false,
        charging_optimization_savings: advancedCalcs.charging_optimization_savings || "",
        charge_management_subscription_costs: advancedCalcs.charge_management_subscription_costs || "",
        charger_network_costs: advancedCalcs.charger_network_costs || "",
      });
    }
  }, [advancedCalcs]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSwitchChange = () => {
    setFormState((prevState) => ({
      ...prevState,
      charging_optimization: !prevState.charging_optimization
    }));
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Software Controls</CardTitle>
        <CardDescription>Modify software costs of your fleet</CardDescription>
        <CardContent>
          <form ref={ref}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label>Charging Optimization</Label>
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
                <Label>Charging Optimization Savings</Label>
                <Input
                  variant="blank"
                  name="charging_optimization_savings"
                  value={formState.charging_optimization_savings}
                  onChange={handleChange}
                  type="text"
                  placeholder=""
                  disabled={!formState.charging_optimization}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Charging Management Subscription Costs</Label>
                <Input
                  variant="blank"
                  name="charge_management_subscription_costs"
                  value={formState.charge_management_subscription_costs}
                  onChange={handleChange}
                  type="text"
                  placeholder=""
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Charging Network Costs</Label>
                <Input
                  variant="blank"
                  name="charger_network_costs"
                  value={formState.charger_network_costs}
                  onChange={handleChange}
                  type="text"
                  placeholder=""
                />
              </div>
            </div>
          </form>
        </CardContent>
      </CardHeader>
    </Card>
  );
});

SoftwareCosts.displayName = "SoftwareCosts";

export default SoftwareCosts;
