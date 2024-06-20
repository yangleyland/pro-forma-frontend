import React, { forwardRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import useAdvancedCalc from "../../store/useAdvancedCalc";
import ControlLabel from "./ControlLabel";

const Economics = forwardRef((props, ref) => {
  const { advancedCalcs } = useAdvancedCalc();
  const [formState, setFormState] = useState({
    inflation: false,
    inflation_escalation_rate: "",
    electricity_escalation_rate: "",
    gasoline_escalation_rate: "",
    infrastructure_loan_term: "",
    infrastructure_loan_interest_rate: "",
    discount_rate_npv: "",
    maintenance_costs_annual_per_station: "",
  });

  useEffect(() => {
    if (advancedCalcs) {
      setFormState({
        inflation: advancedCalcs.inflation ?? false,
        inflation_escalation_rate:
          advancedCalcs.inflation_escalation_rate ?? "",
        electricity_escalation_rate:
          advancedCalcs.electricity_escalation_rate ?? "",
        gasoline_escalation_rate: advancedCalcs.gasoline_escalation_rate ?? "",
        infrastructure_loan_term: advancedCalcs.infrastructure_loan_term ?? "",
        infrastructure_loan_interest_rate:
          advancedCalcs.infrastructure_loan_interest_rate ?? "",
        discount_rate_npv: advancedCalcs.discount_rate_npv ?? "",
        maintenance_costs_annual_per_station:
          advancedCalcs.maintenance_costs_annual_per_station ?? "",
      });
    }
  }, [advancedCalcs]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSwitchChange = () => {
    setFormState((prevState) => ({
      ...prevState,
      inflation: !prevState.inflation,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Economic Controls</CardTitle>
        <CardDescription>Modify economics of your fleet</CardDescription>{" "}
      </CardHeader>
      <CardContent className="w-2/3">
        <form ref={ref} onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <ControlLabel
                text="Inflation"
                info="Toggles inflation on and off"
              />
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
              <div className="flex">
                <ControlLabel
                  text="Inflation Escalation Rate"
                  info="inflation"
                />
              </div>
              <Input
                variant="blank"
                name="inflation_escalation_rate"
                value={formState.inflation_escalation_rate}
                onChange={handleChange}
                type="text"
                placeholder=""
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <ControlLabel
                text="Electricity Escalation Rate"
                info="Controls the escalation rate of electricity"
              />
              <Input
                variant="blank"
                name="electricity_escalation_rate"
                value={formState.electricity_escalation_rate}
                onChange={handleChange}
                type="text"
                placeholder=""
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <ControlLabel
                text="Gasoline Escalation Rate"
                info="Controls the escalation rate of gasoline"
              />
              <Input
                variant="blank"
                name="gasoline_escalation_rate"
                value={formState.gasoline_escalation_rate}
                onChange={handleChange}
                type="text"
                placeholder=""
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <ControlLabel
                text="Infrastructure Loan Term"
                info="Controls the length of time in which the loan will be paid off"
              />
              <Input
                variant="blank"
                name="infrastructure_loan_term"
                value={formState.infrastructure_loan_term}
                onChange={handleChange}
                type="text"
                placeholder=""
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <ControlLabel
                text="Infrastructure Loan Interest Rate"
                info="Controls the interest rate of the loan"
              />
              <Input
                variant="blank"
                name="infrastructure_loan_interest_rate"
                value={formState.infrastructure_loan_interest_rate}
                onChange={handleChange}
                type="text"
                placeholder=""
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <ControlLabel
                text="Discount Rate  (NPV)"
                info="Controls discount rate for calculating the Net Present Value (NPV)"
              />
              <Input
                variant="blank"
                name="discount_rate_npv"
                value={formState.discount_rate_npv}
                onChange={handleChange}
                type="text"
                placeholder=""
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <ControlLabel
                text="Charger Maintenance Costs (annual)"
                info="Cost of maintenance, annual per station"
              />
              <Input
                variant="blank"
                name="maintenance_costs_annual_per_station"
                value={formState.maintenance_costs_annual_per_station}
                onChange={handleChange}
                type="text"
                placeholder=""
              />
            </div>
          </div>
        </form>
      </CardContent>
    </>
  );
});

Economics.displayName = "Economics";

export default Economics;
