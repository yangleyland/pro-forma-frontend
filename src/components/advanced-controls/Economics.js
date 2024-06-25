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
import { NumericFormat } from "react-number-format";

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
    console.log(e.target);
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
      <CardHeader className="flex flex-col items-center">
        <CardTitle>Economic Controls</CardTitle>
        <CardDescription>
          Adjust economic and financial assumptions
        </CardDescription>{" "}
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
                  info="Controls the escalation rate of inflation for EV purchase cost, Default Replacement Allocation, and Annual Maintenance Costs "
                />
              </div>
              <NumericFormat
                customInput={Input}
                variant="blank"
                name="inflation_escalation_rate"
                value={formState.inflation_escalation_rate}
                onValueChange={(values) => {
                  const { value } = values;
                  handleChange({
                    target: {
                      name: "inflation_escalation_rate",
                      value,
                      type: "text",
                    },
                  });
                }}
                thousandSeparator={true}
                decimalScale={2}
                allowNegative={false}
                suffix="%"
                isAllowed={(values) => {
                  const { floatValue } = values;
                  return (
                    floatValue === undefined ||
                    (floatValue >= 0 && floatValue <= 100)
                  );
                }}
                placeholder="%"
              />
              <Input
                type="hidden"
                variant="blank"
                name="inflation_escalation_rate"
                value={formState.inflation_escalation_rate}
                onChange={handleChange}
                placeholder=""
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <ControlLabel
                text="Electricity Escalation Rate"
                info="Controls the escalation rate of electricity"
              />
              <NumericFormat
                customInput={Input}
                variant="blank"
                name="electricity_escalation_rate"
                value={formState.electricity_escalation_rate}
                onValueChange={(values) => {
                  const { value } = values;
                  handleChange({
                    target: {
                      name: "electricity_escalation_rate",
                      value,
                      type: "text",
                    },
                  });
                }}
                thousandSeparator={true}
                decimalScale={2}
                allowNegative={false}
                suffix="%"
                isAllowed={(values) => {
                  const { floatValue } = values;
                  return (
                    floatValue === undefined ||
                    (floatValue >= 0 && floatValue <= 100)
                  );
                }}
                placeholder="%"
              />
              <Input
                variant="blank"
                name="electricity_escalation_rate"
                value={formState.electricity_escalation_rate}
                onChange={handleChange}
                type="hidden"
                placeholder=""
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <ControlLabel
                text="Gasoline Escalation Rate"
                info="Controls the escalation rate of gasoline"
              />
              <NumericFormat
                customInput={Input}
                variant="blank"
                name="gasoline_escalation_rate"
                value={formState.gasoline_escalation_rate}
                onValueChange={(values) => {
                  const { value } = values;
                  handleChange({
                    target: {
                      name: "gasoline_escalation_rate",
                      value,
                      type: "text",
                    },
                  });
                }}
                thousandSeparator={true}
                decimalScale={2}
                allowNegative={false}
                suffix="%"
                isAllowed={(values) => {
                  const { floatValue } = values;
                  return (
                    floatValue === undefined ||
                    (floatValue >= 0 && floatValue <= 100)
                  );
                }}
                placeholder="%"
              />
              <Input
                variant="blank"
                name="gasoline_escalation_rate"
                value={formState.gasoline_escalation_rate}
                onChange={handleChange}
                type="hidden"
                placeholder=""
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <ControlLabel
                text="Infrastructure Loan Term (yrs)"
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
              <NumericFormat
                customInput={Input}
                variant="blank"
                name="infrastructure_loan_interest_rate"
                value={formState.infrastructure_loan_interest_rate}
                onValueChange={(values) => {
                  const { value } = values;
                  handleChange({
                    target: {
                      name: "infrastructure_loan_interest_rate",
                      value,
                      type: "text",
                    },
                  });
                }}
                thousandSeparator={true}
                decimalScale={2}
                allowNegative={false}
                suffix="%"
                isAllowed={(values) => {
                  const { floatValue } = values;
                  return (
                    floatValue === undefined ||
                    (floatValue >= 0 && floatValue <= 100)
                  );
                }}
                placeholder="%"
              />
              <Input
                variant="blank"
                name="infrastructure_loan_interest_rate"
                value={formState.infrastructure_loan_interest_rate}
                onChange={handleChange}
                type="hidden"
                placeholder=""
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <ControlLabel
                text="Discount Rate  (NPV)"
                info="Controls discount rate for calculating the Net Present Value (NPV)"
              />
              <NumericFormat
                customInput={Input}
                variant="blank"
                name="discount_rate_npv"
                value={formState.discount_rate_npv}
                onValueChange={(values) => {
                  const { value } = values;
                  handleChange({
                    target: {
                      name: "discount_rate_npv",
                      value,
                      type: "text",
                    },
                  });
                }}
                thousandSeparator={true}
                decimalScale={2}
                allowNegative={false}
                suffix="%"
                isAllowed={(values) => {
                  const { floatValue } = values;
                  return (
                    floatValue === undefined ||
                    (floatValue >= 0 && floatValue <= 100)
                  );
                }}
                placeholder="%"
              />
              <Input
                variant="blank"
                name="discount_rate_npv"
                value={formState.discount_rate_npv}
                onChange={handleChange}
                type="hidden"
                placeholder=""
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <ControlLabel
                text="Charger Maintenance Costs  ($/yr)"
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
