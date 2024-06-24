// getBackgroundColor.js

export const getBackgroundColor = (title) => {
  switch (title) {
    case "Total Electric Vehicles in Fleet":
      return "#F2F2F2";
    case "Number of New Ports":
      return "#F2F2F2";
    case "Cost of Electric Vehicles":
      return "";
    case "Estimated EV Maintenance Costs":
      return "";
    case "Electric Vehicle Charging Costs":
      return "";
    case "Default Vehicle Replacement Fund Allocation":
      return "";
    case "Existing Vehicle Maintenance Costs":
      return "";
    case "Existing Vehicle Annual Fuel Cost":
      return "";
    case "Charger Purchase Costs":
      return "#F2F2F2";
    case "Charger Install Costs":
      return "#F2F2F2";
    case "Trenching Costs":
      return "#F2F2F2";
    case "Infrastructure Upgrade Cost (utility)":
      return "#F2F2F2";
    case "Infrastructure Upgrade Cost (customer)":
      return "#F2F2F2";
    case "Procurement Management Cost":
      return "#F2F2F2";
    case "Public Works Engineering Costs":
      return "#F2F2F2";
    case "Charger Maintenance Costs":
      return "#F2F2F2";
    case "Charger Network and Management Costs":
      return "#F2F2F2";
    case "Charge Management Savings":
      return "#F2F2F2";
    case "Charger Incentives":
      return "#F2F2F2";
    case "Infrastructure Cost Pre-Loan":
      return "#F2F2F2";
    case "Loan Amount":
      return "";
    case "Loan Principal Remaining":
      return "";
    case "Loan Annual Interest":
      return "";
    case "Loan Annual Payments":
      return "";
    case "Total Vehicle Costs":
      return "#F2F2F2";
    case "Total Vehicle Savings":
      return "#F2F2F2";
    case "Total Charging Infrastructure Costs":
      return "#F2F2F2";
    case "Total Charging Infrastructure Savings":
      return "#F2F2F2";
    case "Total Annual Costs":
      return "";
    case "Total Anuual Savings":
      return "";
    case "Annual Cost Benefit":
      return "";
    case "Cumulative Cost Benefit":
      return "";
    case "Vehicles":
      return "#9fbf95";
    case "Charging Infrastructure":
      return "#9fbf95";
    case "Totals":
      return "#9fbf95";
    case "Loan Information":
      return "#9fbf95";
    default:
      return "";
  }
};

export const getTextColor = (title, value) => {
  let textColor = "black";
  if (value === "-") {
    return "black";
  }
  if (
    title === "Total Annual Savings" ||
    title === "Annual Cost Benefit" ||
    title === "Cumulative Cost Benefit" ||
    title === "Total Annual Costs"
  ) {
   
    if (value && (value[0] === "-" || value < 0)) {
      textColor = "red";
    } else {
      textColor = "green";
    }
  }
  return textColor;
};
