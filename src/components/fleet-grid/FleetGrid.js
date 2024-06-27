import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState, useEffect,useRef } from "react"; // React State Management
import useAuthStore from "../../store/useAuthStore";

const formatAsCurrency = (number) => {
  if (number === null || number === undefined) return "";
  return `$${Math.floor(number).toLocaleString()}`;
};

const FleetGrid = () => {
  const { data } = useAuthStore();
  // Fetch data & update rowData state
  useEffect(() => {
    setRowData(data);
  }, [data]); //maybe change this

  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([]);

  // Store gridApi to access selected rows
  const [gridApi, setGridApi] = useState(null);

  // const onGridReady = (params) => {
  //   setGridApi(params.api);
  // };

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "Equipment ID", editable: true },
    {
      field: "Electrification Category",
      cellStyle: { color: "gray", border: "none" },
    },
    {
      headerName: "Site",
      cellStyle: { color: "gray", border: "none" },
      field: "Simplified Domicile",
    },
    { field: "Replacement Year", editable: true, type: "number" },
    {
      field: "Expected Lifetime",
      editable: true,
      type: "number",
      cellStyle: { textAlign: "right" },
    },
    {
      headerName: "EV MSRP",
      field: "EV Purchase Cost pre-incentive",
      editable: true,
      type: "currency",
      valueFormatter: (params) => formatAsCurrency(params.value),
      cellStyle: { textAlign: "right" },
    },
    {
      headerName: "ICEV MSRP",
      field: "Default Replacement Allocation",
      editable: true,
      type: "currency",
      valueFormatter: (params) => formatAsCurrency(params.value),
      cellStyle: { textAlign: "right" },
    },
    {
      headerName: "State and Local Incentives",
      field: "HVIP, PG&E EV Fleet Program, and Other Incentives",
      type: "currency",
      editable: true,
      valueFormatter: (params) => formatAsCurrency(params.value),
      cellStyle: { textAlign: "right" },
    },
    {
      headerName: "Federal Incentives",
      field: "IRA Incentives",
      editable: true,
      type: "currency",
      valueFormatter: (params) => formatAsCurrency(params.value),
      cellStyle: { textAlign: "right" },
    },
  ]);

  const handleCellValueChanged = async (event) => {
    const updatedData = event.data;
    const field = event.colDef.field;
    const value = event.newValue;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ROUTE}api/fleet/patch`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            [field]: value,
            equipment_id: updatedData.equipment_id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update data");
      }

      const result = await response.json();
      console.log("Update successful:", result);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const gridRef = useRef(null);
  useEffect(() => {
    const savedState = localStorage.getItem('agGridColumnState');
    if (savedState && gridRef.current) {
      gridRef.current.columnApi.applyColumnState({
        state: JSON.parse(savedState),
        applyOrder: true,
      });
    }
  }, []);

  const saveColumnState = () => {
    const columnState = gridRef.current.columnApi.getColumnState();
    localStorage.setItem('agGridColumnState', JSON.stringify(columnState));
  };

  const onGridReady = params => {
    gridRef.current = params.api;
    params.columnApi.applyColumnState({
      state: JSON.parse(localStorage.getItem('agGridColumnState')) || [],
      applyOrder: true,
    });

    params.api.addEventListener('columnMoved', saveColumnState);
    params.api.addEventListener('columnResized', saveColumnState);
    params.api.addEventListener('columnPinned', saveColumnState);
    params.api.addEventListener('columnVisible', saveColumnState);
  };

  return (
    // wrapping container with theme & size
    <div
      className="ag-theme-quartz relative h-[95%]" // applying the grid theme
    >
      <AgGridReact
        stopEditingWhenCellsLoseFocus={true}
        pagination={true}
        rowData={rowData}
        columnDefs={colDefs}
        onCellValueChanged={handleCellValueChanged}
        onGridReady={onGridReady}
        autoSizeStrategy={{ type: "fitCellContents", skipHeader: false }}
        suppressColumnVirtualisation={true}
      />
      <div className="h-full absolute top-0 right-0 bottom-0 w-5 bg-gradient-to-r from-transparent to-black/10 pointer-events-none z-20 rounded-lg"></div>
    </div>
  );
};

export default FleetGrid;
