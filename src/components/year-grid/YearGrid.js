import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState, useEffect, useMemo } from "react"; // React State Management
import useAuthStore from "../../store/useAuthStore";
import useYears from "../../store/useYears";
import useYearOverYear from "../../store/useYearOverYear";

// Function to format values as currency
const formatAsCurrency = (value) => {
  const absValue = Math.abs(value)
    .toFixed(0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return value < 0 ? `-$${absValue}` : `$${absValue}`;
};

// Function to format the entire object
const formatElectricVehicles = (data) => {
  const formattedData = {};
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      if (key === "title") {
        formattedData[key] = data[key]; // Do not format if the key is "title"
      } else {
        formattedData[key] = formatAsCurrency(data[key]);
      }
    }
  }
  return formattedData;
};

const YearGrid = () => {
  const { YEARS } = useYears();
  const {
    estimatedElectricVehicles,
    costOfElectricVehicles,
    defaultVehicleReplacementFundAllocation,
    estimatedEVMaintenanceCosts,
    electricVehicleChargingCosts,
    existingVehicleMaintenanceCosts,
    existingVehicleAnnualFuelCost,
    numberOfNewPorts,
    loanAmount,
    loanPrincipalRemaining,
    loanAnnualInterest,
    loanAnnualPayments,
    capitalPlanningFunding,
    chargerInstallCosts,
    trenchingCosts,
    upgradeCostUtility,
    upgradeCostCustomer,
    procurementManagementCost,
    chargerIncentives,
    chargerPurchaseCosts,
    chargerMaintenanceCosts,
    chargerNetworkAndManagementCosts,
    chargeMangementSavings,
    totalVehicleCosts,
    totalVehicleSavings,
    totalChargingInfrastructureCosts,
    totalChargingInfrastructureSavings,
    totalCosts,
    totalSavings,
    annualCostBenefit,
    cumulativeCostBenefit,
  } = useYearOverYear();

  const createDataWithTitles = (data, title) => ({ ...data, title });

  const data = useMemo(
    () => [
      createDataWithTitles(
        estimatedElectricVehicles,
        "Estimated Electric Vehicles"
      ),
      createDataWithTitles(numberOfNewPorts, "Number of New Ports"),
      formatElectricVehicles(
        createDataWithTitles(
          costOfElectricVehicles,
          "Cost of Electric Vehicles"
        )
      ),
      formatElectricVehicles(
        createDataWithTitles(
          estimatedEVMaintenanceCosts,
          "Estimated EV Maintenance Costs"
        )
      ),
      formatElectricVehicles(
        createDataWithTitles(
          electricVehicleChargingCosts,
          "Electric Vehicle Charging Costs"
        )
      ),
      formatElectricVehicles(
        createDataWithTitles(
          defaultVehicleReplacementFundAllocation,
          "Default Vehicle Replacement Fund Allocation"
        )
      ),
      formatElectricVehicles(
        createDataWithTitles(
          existingVehicleMaintenanceCosts,
          "Existing Vehicle Maintenance Costs"
        )
      ),
      formatElectricVehicles(
        createDataWithTitles(
          existingVehicleAnnualFuelCost,
          "Existing Vehicle Annual Fuel Cost"
        )
      ),
      formatElectricVehicles(
        createDataWithTitles(chargerPurchaseCosts, "Charger Purchase Costs")
      ),
      formatElectricVehicles(
        createDataWithTitles(chargerInstallCosts, "Charger Install Costs")
      ),
      formatElectricVehicles(
        createDataWithTitles(trenchingCosts, "Trenching Costs")
      ),
      formatElectricVehicles(
        createDataWithTitles(
          upgradeCostUtility,
          "Infrastructure Upgrade Cost (utility)"
        )
      ),
      formatElectricVehicles(
        createDataWithTitles(
          upgradeCostCustomer,
          "Infrastructure Upgrade Cost (customer)"
        )
      ),
      formatElectricVehicles(
        createDataWithTitles(
          procurementManagementCost,
          "Procurement Management Cost"
        )
      ),
      formatElectricVehicles(
        createDataWithTitles(
          chargerMaintenanceCosts,
          "Charger Maintenance Costs"
        )
      ),
      formatElectricVehicles(
        createDataWithTitles(
          chargerNetworkAndManagementCosts,
          "Charger Network and Management Costs"
        )
      ),
      formatElectricVehicles(
        createDataWithTitles(
          chargeMangementSavings,
          "Charge Management Savings"
        )
      ),
      formatElectricVehicles(
        createDataWithTitles(chargerIncentives, "Charger Incentives")
      ),
      formatElectricVehicles(
        createDataWithTitles(capitalPlanningFunding, "Capital Planning Funding")
      ),
      formatElectricVehicles(createDataWithTitles(loanAmount, "Loan Amount")),
      formatElectricVehicles(
        createDataWithTitles(loanPrincipalRemaining, "Loan Principal Remaining")
      ),
      formatElectricVehicles(
        createDataWithTitles(loanAnnualInterest, "Loan Annual Interest")
      ),
      formatElectricVehicles(
        createDataWithTitles(loanAnnualPayments, "Loan Annual Payments")
      ),
      formatElectricVehicles(
        createDataWithTitles(totalVehicleCosts, "Total Vehicle Costs")
      ),
      formatElectricVehicles(
        createDataWithTitles(totalVehicleSavings, "Total Vehicle Savings")
      ),
      formatElectricVehicles(
        createDataWithTitles(
          totalChargingInfrastructureCosts,
          "Total Charging Infrastructure Costs"
        )
      ),
      formatElectricVehicles(
        createDataWithTitles(
          totalChargingInfrastructureSavings,
          "Total Charging Infrastructure Savings"
        )
      ),
      formatElectricVehicles(createDataWithTitles(totalCosts, "Total Costs")),
      formatElectricVehicles(
        createDataWithTitles(totalSavings, "Total Savings")
      ),
      formatElectricVehicles(
        createDataWithTitles(annualCostBenefit, "Annual Cost Benefit")
      ),
      formatElectricVehicles(
        createDataWithTitles(cumulativeCostBenefit, "Cumulative Cost Benefit")
      ),
    ],
    [cumulativeCostBenefit]
  );

  // Fetch data & update rowData state
  useEffect(() => {
    if (!data || !data[0]["2025"]) {
        return;
    }
    setRowData(data);
    console.log(data)
  }, [data]);

  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([]);

  // Store gridApi to access selected rows
  const [gridApi, setGridApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  // Column Definitions: Defines the columns to be displayed.
  // Function to generate year columns
  const generateYearColumns = (years) => {
    return years.map((year) => ({
      headerName: `${year}`,
      field: `${year}`,
      editable: false,
      cellStyle: (params) => {
        if (params.value && params.value[0]==="-") {
          return { color: 'red', textAlign: 'right'};
        }
        return { textAlign: 'right' };
      },
      valueFormatter: (params) => params.value,
      sortable: false,
    }));
  };

  // Combine "Title" column with dynamically generated year columns
  const [colDefs, setColDefs] = useState([]);

  useEffect(() => {
    const combinedColumns = [
      {
        field: "title",
        editable: false,
        cellStyle: { fontWeight: "bold" },
        pinned: "left",
        sortable: false,
      },
      ...generateYearColumns(YEARS),
    ];
    setColDefs(combinedColumns);
  }, [YEARS]);



//   const getRowStyle = (params) => {
//     const rowIndex = params.node.rowIndex;
//     if (rowIndex < 2) {
//       return { background: "#e9e9e9" };
//     } else if (rowIndex < 8) {
//       return { background: "#ffffff" };
//     } else if (rowIndex < 18) {
//       return { background: "#e9e9e9" };
//     } else if (rowIndex < 23) {
//       return { background: "#ffffff" };
//     } else if (rowIndex < 27) {
//       return { background: "#e9e9e9" };
//     } else {
//       return { background: "#ffffff" };
//     }
//   };

//   const rowStyle = { background: "yellow" };

  return (
    // wrapping container with theme & size
    <div
      className="ag-theme-quartz h-full" // applying the grid theme
      style={{ height: 700 }}
    >
      <AgGridReact

        rowData={rowData}
        columnDefs={colDefs}
        onGridReady={onGridReady}
        // getRowStyle={getRowStyle}
        // rowStyle={rowStyle}
      />
    </div>
  );
};

export default YearGrid;
