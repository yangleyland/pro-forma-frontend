import React, { forwardRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

const Economics = forwardRef((props, ref) => {
  
  const [formState, setFormState] = useState({
    inflation: false,
    inflationRate: "3",
    electricityRate: "3",
    gasolineRate: "3",
    loanTerm: "10",
    loanInterestRate: "3",
    discountRate: "3",
    maintenanceCosts: "400"
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSwitchChange = () => {
    setFormState((prevState) => ({
      ...prevState,
      inflation: !prevState.inflation
    }));
  };
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Economic Controls</CardTitle>
        <CardDescription>Modify economics of your fleet</CardDescription>
        <CardContent>
          <form ref={ref}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label>Inflation</Label>
                <Switch
                  checked={formState.inflation}
                  onCheckedChange={handleSwitchChange}
                />
                <input
                  type="hidden"
                  name="inflation"
                  value={formState.inflation ? "true" : "false"}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Inflation Escalation Rate</Label>
                <Input
                  variant="blank"
                  name="inflationRate"
                  value={formState.inflationRate}
                  onChange={handleChange}
                  type="text"
                  placeholder=""
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Electricity Escalation Rate</Label>
                <Input
                  variant="blank"
                  name="electricityRate"
                  value={formState.electricityRate}
                  onChange={handleChange}
                  type="text"
                  placeholder=""
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Gasoline Escalation Rate</Label>
                <Input
                  variant="blank"
                  name="gasolineRate"
                  value={formState.gasolineRate}
                  onChange={handleChange}
                  type="text"
                  placeholder=""
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Infrastructure Loan Term</Label>
                <Input
                  variant="blank"
                  name="loanTerm"
                  value={formState.loanTerm}
                  onChange={handleChange}
                  type="text"
                  placeholder=""
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Infrastructure Loan Interest Rate</Label>
                <Input
                  variant="blank"
                  name="loanInterestRate"
                  value={formState.loanInterestRate}
                  onChange={handleChange}
                  type="text"
                  placeholder=""
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Discount Rate (NPV)</Label>
                <Input
                  variant="blank"
                  name="discountRate"
                  value={formState.discountRate}
                  onChange={handleChange}
                  type="text"
                  placeholder=""
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Maintenance Costs (annual)</Label>
                <Input
                  variant="blank"
                  name="maintenanceCosts"
                  value={formState.maintenanceCosts}
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

Economics.displayName = "Economics";

export default Economics;
