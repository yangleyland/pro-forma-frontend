import React, { forwardRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

const SoftwareCosts = forwardRef((props, ref) => {
  const [formState, setFormState] = useState({
    chargingOptimization: false,
    chargingOptimizationSavings: "1000",
    chargingManagementSubscription: "450",
    chargingNetworkCosts: "0"
  });

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
      chargingOptimization: !prevState.chargingOptimization
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
                  checked={formState.chargingOptimization}
                  onCheckedChange={handleSwitchChange}
                />
                {/* Hidden input to include switch state in form data */}
                <input
                  type="hidden"
                  name="chargingOptimization"
                  value={formState.chargingOptimization ? "true" : "false"}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Charging Optimization Savings</Label>
                <Input
                  variant="blank"
                  name="chargingOptimizationSavings"
                  value={formState.chargingOptimizationSavings}
                  onChange={handleChange}
                  type="text"
                  placeholder=""
                  disabled={!formState.chargingOptimization}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Charging Management Subscription Costs</Label>
                <Input
                  variant="blank"
                  name="chargingManagementSubscription"
                  value={formState.chargingManagementSubscription}
                  onChange={handleChange}
                  type="text"
                  placeholder=""
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Charging Network Costs</Label>
                <Input
                  variant="blank"
                  name="chargingNetworkCosts"
                  value={formState.chargingNetworkCosts}
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
