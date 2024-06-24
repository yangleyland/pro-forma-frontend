import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState, useEffect, useMemo, useRef, useCallback } from "react"; // React State Management
import useAuthStore from "../../store/useAuthStore";
import useYears from "../../store/useYears";
import useYearOverYear from "../../store/useYearOverYear";
import { getBackgroundColor, getTextColor } from "./getColor";

// Function to format values as currency
const formatAsCurrency = (value) => {
  if (value === 0) {
    return "-";
  }
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
        if (data.title === "Total Annual Costs") {
          formattedData[key] = addHyphen(formattedData[key]);
        }
      }
    }
  }
  return formattedData;
};

const addHyphen = (value) => {
  if (value[0] === "-") {
    return value;
  }else{
    return "-" + value;
  }
};
const YearGrid = () => {
  const { YEARS, CURRENT_YEAR } = useYears();
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
    estimatedPublicWorksEngineeringCosts,
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
    totalInfrastructureCostPreLoan,
  } = useYearOverYear();

  const createDataWithTitles = (data, title) => ({ ...data, title });

  const createEmptyRow = (label) => {
    const emptyRow = { title: label };
    YEARS.forEach((year) => {
      emptyRow[year] = "";
    });
    emptyRow["empty"] = true;
    return emptyRow;
  };
  const data = useMemo(
    () => [
      createDataWithTitles(
        estimatedElectricVehicles,
        "Estimated Electric Vehicles"
      ),
      createDataWithTitles(numberOfNewPorts, "Number of New Ports"),
      createEmptyRow("Vehicles"),
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
      createEmptyRow("Charging Infrastructure"),
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
          estimatedPublicWorksEngineeringCosts,
          "Public Works Engineering Costs"
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
        createDataWithTitles(
          totalInfrastructureCostPreLoan,
          "Infrastructure Cost Pre-Loan"
        )
      ),
      createEmptyRow("Loan Information"),
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
      createEmptyRow("Totals"),
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
      formatElectricVehicles(
        createDataWithTitles(totalCosts, "Total Annual Costs")
      ),
      formatElectricVehicles(
        createDataWithTitles(totalSavings, "Total Annual Savings")
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
    if (!data || !data[0].hasOwnProperty("2030")) {
      return;
    }
    console.log(data);
    setRowData(data);
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
      width: 120,
      cellStyle: (params) => {
        return {
          color: getTextColor(params.data.title, params.value),
          textAlign: "right",
          backgroundColor:
            year < CURRENT_YEAR &&
            getBackgroundColor(params.data.title) !== "#9fbf95"
              ? "#d1d1d1"
              : getBackgroundColor(params.data.title),
        };
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
        cellStyle: (params) => {
          return {
            fontWeight: "bold",
            backgroundColor: getBackgroundColor(params.value),
          };
        },
        pinned: "left",
        sortable: false,
      },
      ...generateYearColumns(YEARS),
    ];
    setColDefs(combinedColumns);
  }, [YEARS]);
  const [showGradient, setShowGradient] = useState(true);
  const gridRef = useRef(null);
  const autoSizeStrategy = useMemo(() => {
    return {
      type: "fitCellContents",
      skipHeader: false,
    };
  }, []);
  const onFirstDataRendered = useCallback((params) => {
    // This ensures columns are sized after data is loaded
    params.api.autoSizeAllColumns();
  }, []);

  const autoSizeAll = useCallback((skipHeader) => {
    const allColumnIds = [];
    gridRef.current.api.getColumns().forEach((column) => {
      allColumnIds.push(column.getId());
    });
    gridRef.current.api.autoSizeColumns(allColumnIds, skipHeader);
  }, []);
  return (
    // wrapping container with theme & size
    <div
      className="ag-theme-quartz h-full" // applying the grid theme
      style={{ height: 700 }}
    >
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={colDefs}
        onGridReady={onGridReady}
        suppressRowHoverHighlight={true}
        suppressCellFocus={true}
        autoSizeStrategy={autoSizeStrategy}
      />
      <div className="h-full absolute top-0 right-0 bottom-0 w-5 bg-gradient-to-r from-transparent to-black/10 pointer-events-none z-20"></div>
    </div>
  );
};

export default YearGrid;
