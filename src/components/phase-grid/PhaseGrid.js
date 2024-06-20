import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState, useEffect } from "react"; // React State Management
import usePhases from "../../store/usePhases";
import { Button } from "../ui/button";
import useAuthStore from "../../store/useAuthStore";
const formatAsCurrency = (number) => {
  if (number === null || number === undefined) return "";
  return `$${Math.floor(number).toLocaleString()}`;
};

const PhaseGrid = () => {
  const { phases, addPhase, fetchPhases, updatePhase, calculateCosts } =
    usePhases();
  const { user } = useAuthStore();
  const { controlsData } = useAuthStore.getState();

  const [siteOptions, setSiteOptions] = useState(
    controlsData?.domiciles.map((option) => option) || []
  );

  // Fetch data & update rowData state

  useEffect(() => {
    setSiteOptions(controlsData?.domiciles.map((option) => option) || []);
  }, [controlsData]);
  useEffect(() => {
    setRowData(phases);
  }, [phases]); //maybe change this

  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "year", editable: true },
    {
      field: "site",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: siteOptions,
      },
    },
    {
      headerName: "Loan Amount",
      field: "loan_amount",
      type: "currency",
      valueFormatter: (params) => formatAsCurrency(params.value),
      cellStyle: { textAlign: "right" },
      editable: true,
    },
    {
      headerName: "Capital Planning Funding",
      field: "capital_planning_funding",
      type: "currency",
      valueFormatter: (params) => formatAsCurrency(params.value),
      cellStyle: { textAlign: "right" },
      editable: true,
    },
    {
      headerName: "Trenching Costs",
      field: "trenching_costs",
      editable: true,
      type: "currency",
      valueFormatter: (params) => formatAsCurrency(params.value),
      cellStyle: { textAlign: "right" },
    },
    {
      headerName: "Upgrade Cost Utility",
      field: "upgrade_cost_utility",
      editable: true,
      type: "currency",
      valueFormatter: (params) => formatAsCurrency(params.value),
      cellStyle: { textAlign: "right" },
    },
    {
      headerName: "Upgrade Cost (customer)",
      field: "upgrade_cost_customer",
      type: "currency",
      editable: true,
      valueFormatter: (params) => formatAsCurrency(params.value),
      cellStyle: { textAlign: "right" },
    },
    {
      headerName: "Procurement Management Cost",
      field: "procurement_management_cost",
      editable: true,
      type: "currency",
      valueFormatter: (params) => formatAsCurrency(params.value),
      cellStyle: { textAlign: "right" },
    },
    {
      headerName: "Ports <10 kW",
      field: "port_less_than_10_kw",
      editable: true,
      type: "number",
    },
    {
      headerName: "Ports 10-20 kW",
      field: "port_10_20_kw",
      editable: true,
      type: "number",
    },
    {
      headerName: "Ports 25 kW",
      field: "port_25_kw",
      editable: true,
      type: "number",
    },
    {
      headerName: "Ports 180-200 kW",
      field: "port_180_200_kw",
      editable: true,
      type: "number",
    },
    {
      
      field: "incentives",
      type: "currency",
      valueFormatter: (params) => formatAsCurrency(params.value),
      cellStyle: { textAlign: "right" },
      editable: true,
    },
    {
      headerName: "Public Works Engineering Costs",
      field: "estimated_public_works_engineering_costs",
      editable: true,
      type: "currency",
      valueFormatter: (params) => formatAsCurrency(params.value),
      cellStyle: { textAlign: "right" },
    },
    {
      headerName: "Charger Cost",
      field: "cost",
      editable: false,
      type: "currency",
      valueFormatter: (params) => formatAsCurrency(params.value),
      cellStyle: { textAlign: "right", fontWeight: "bold", color: "gray" },
    },
    {
      headerName: "Installation Cost",
      field: "installCost",
      editable: false,
      type: "currency",
      valueFormatter: (params) => formatAsCurrency(params.value),
      cellStyle: { textAlign: "right", fontWeight: "bold", color: "gray" },
    },
  ]);

  useEffect(() => {
    if (siteOptions.length > 0) {
      setColDefs((prevColDefs) =>
        prevColDefs.map((colDef) =>
          colDef.field === "site"
            ? {
                ...colDef,
                cellEditorParams: {
                  ...colDef.cellEditorParams,
                  values: siteOptions,
                },
              }
            : colDef
        )
      );
    }
  }, [siteOptions]);
  // Handle adding a new row
  const handleAddRow = async () => {
    try {
      const newRow = {
        user_id: user.id,
        year: 2024,
        site: "",
        loan_amount: 0,
        trenching_costs: 0,
        upgrade_cost_utility: 0,
        upgrade_cost_customer: 0,
        procurement_management_cost: 0,
        capital_planning_funding: 0,
        port_less_than_10_kw: 0,
        port_10_20_kw: 0,
        port_25_kw: 0,
        port_180_200_kw: 0,
        incentives: 0,
        cost: 0,
        installCost: 0,
      };
      const response = await addPhase(newRow);

      if (!response.ok) {
        throw new Error("Failed to add data");
      }
      setRowData(phases); // Add the new row to the state
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleCellValueChanged = async (event) => {
    const updatedData = event.data;
    const field = event.colDef.field;
    const value = event.newValue;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ROUTE}api/phases/patch`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ [field]: value, id: updatedData.id }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update data");
      }

      const result = await response.json();
      console.log("Update successful:", result);
      await updatePhase(result[0]);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  const handleDeleteRow = () => {
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const remainingRows = rowData.filter((row) => !selectedData.includes(row));
    setRowData(remainingRows);

    // Optionally, send a delete request to your server
    selectedData.forEach(async (row) => {
      try {
        const response = await fetch(
          `http://localhost:3002/api/phases/${row.id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete data");
        }
        await fetchPhases(user.id);
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    });
  };

  const [gridApi, setGridApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  return (
    // wrapping container with theme & size
    <div
      className="ag-theme-quartz" // applying the grid theme
    >
      <AgGridReact
        domLayout="autoHeight"
        stopEditingWhenCellsLoseFocus={true}
        rowData={rowData}
        columnDefs={colDefs}
        rowSelection="single"
        onCellValueChanged={handleCellValueChanged}
        onGridReady={onGridReady}
      />
      <div className="flex gap-2 mt-2">
        <Button variant="secondary" onClick={handleAddRow}>
          Add Row
        </Button>
        <Button variant="secondary" onClick={handleDeleteRow}>
          Delete Selected Row
        </Button>
      </div>
    </div>
  );
};

export default PhaseGrid;
