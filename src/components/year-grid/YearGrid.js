import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState, useEffect, useMemo, useRef, useCallback } from "react"; // React State Management
import useAuthStore from "../../store/useAuthStore";
import useYears from "../../store/useYears";
import useYearOverYear from "../../store/useYearOverYear";
import { getBackgroundColor, getTextColor } from "./getColor";
import useColumnState from "../../store/useColumnState";
import { set } from "react-hook-form";
// import "./yeargrid.css";

// Function to format values as currency
const formatAsCurrency = (value) => {
  // Check if the value is exactly 0 or rounds to 0
  if (value === 0 || Math.round(value) === 0) {
    return "-";
  }

  // Round the value to the nearest integer
  const roundedValue = Math.round(value);

  const absValue = Math.abs(roundedValue)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return roundedValue < 0 ? `-$${absValue}` : `$${absValue}`;
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
  } else {
    return "-" + value;
  }
};
const YearGrid = () => {
  const { YEARS, CURRENT_YEAR } = useYears();
  const { yearColumns, setYearColumns } = useColumnState();

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
        "Total Electric Vehicles in Fleet"
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
    let loanAmountSum = 0;
    let capitalPlanningFundingSum = 0;

    const filteredData = data.filter((item) => {
      if (
        item.title === "Loan Amount" ||
        item.title === "Capital Planning Funding"
      ) {
        const sum = Object.entries(item).reduce((acc, [key, value]) => {
          if (key !== "title" && value !== "-") {
            return 1;
          }
          return acc;
        }, 0);

        if (item.title === "Loan Amount") {
          loanAmountSum = sum;
        } else {
          capitalPlanningFundingSum = sum;
        }
      }

      // Check if any value other than 'title' is non-zero and not '-'
      return Object.entries(item).some(([key, value]) => {
        return key !== "title" && value !== "-" && value !== 0;
      });
    });

    // Remove "Loan Information" if both sums are 0
    const finalFilteredData = filteredData.filter(
      (item) =>
        item.title !== "Loan Information" ||
        loanAmountSum !== 0 ||
        capitalPlanningFundingSum !== 0
    );
    const addUniqueIdToData = (data) => {
      return data.map((item, index) => ({ ...item, id: String(index) }));
    };
    
    setRowData(addUniqueIdToData(finalFilteredData));
  }, [data]);
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState(null);

  // Store gridApi to access selected rows
  const [gridApi, setGridApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    params.api.addEventListener("bodyScroll", onBodyScroll);
  };

  // Column Definitions: Defines the columns to be displayed.
  // Function to generate year columns

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };
  const generateYearColumns = (years) => {
    return years.map((year) => ({
      headerName: `${year}`,
      field: `${year}`,
      editable: false,
      initialWidth: 150,
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
  const onGridPreDestroyed = (event) => {
    setYearColumns(event.state);
  };

  // Combine "Title" column with dynamically generated year columns
  const [colDefs, setColDefs] = useState([
    {
      field: "title",
      editable: false,
      cellStyle: (params) => {
        return {
          fontWeight: "bold",
          backgroundColor: getBackgroundColor(params.value),
        };
      },
      initialPinned: "left",
      sortable: false,
    },
    ...generateYearColumns(YEARS),
  ]);
  const gridRef = useRef(null);
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
        initialPinned: "left",
        sortable: false,
      },
      ...generateYearColumns(YEARS),
    ];
    // setColDefs(combinedColumns);
    if (gridRef.current.api) {
      gridRef.current.api.setGridOption("columnDefs", combinedColumns);
    }
    

  }, [YEARS,gridRef]);

  
  const autoSizeStrategy = useMemo(() => {
    return {
      type: "fitCellContents",
      skipHeader: false,
    };
  }, []);

  const [shadow, setShadow] = useState(true);
  const onBodyScroll = (event) => {
    const horizontalScrollPosition = event.api.getHorizontalPixelRange();
    const size = event.api.getColumnState();
    const totalWidth = size.reduce((total, obj) => {
      if (!obj.pinned && !obj.hide) {
        return total + obj.width;
      }
      return total;
    }, 0);
    if (totalWidth - horizontalScrollPosition.right < 1) {
      setShadow(false);
    } else {
      setShadow(true);
    }
  };
  const preprocessYearColumns = (columns) => {
    return {
      ...columns,
      columnOrder: undefined,
    };
  };
  const getRowId = (params) =>{
    console.log(params.data.id)
    return params.data.id;
  }

  return (
    // wrapping container with theme & size
    <div
      className="ag-theme-quartz h-full relative w-full" // applying the grid theme
    >
      <AgGridReact
        style={{ width: "100%", height: "100%" }}
        initialState={preprocessYearColumns(yearColumns)}
        ref={gridRef}
        suppressColumnVirtualisation={true}
        autoSizeStrategy={isEmpty(yearColumns) ? autoSizeStrategy : {}}
        rowData={rowData}
        columnDefs={colDefs}
        onGridReady={onGridReady}
        suppressRowHoverHighlight={true}
        suppressCellFocus={true}
        onGridPreDestroyed={onGridPreDestroyed}
        getRowId={getRowId}
      />
      {shadow && (
        <div className="h-full absolute top-0 right-0 bottom-0 w-5 bg-gradient-to-r from-transparent to-black/10 pointer-events-none z-20 rounded-lg"></div>
      )}
    </div>
  );
};

export default YearGrid;
