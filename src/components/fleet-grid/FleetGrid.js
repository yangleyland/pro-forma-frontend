import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState, useEffect } from "react"; // React State Management
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

  // Handle adding a new row
  const handleAddRow = () => {
    const newRow = { userId: Date.now(), city_name: "", cost: 0 }; // Adjust fields as necessary
    setRowData([...rowData, newRow]);
  };

  // Handle deleting the selected row
  const handleDeleteRow = () => {
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const remainingRows = rowData.filter((row) => !selectedData.includes(row));
    setRowData(remainingRows);

    // Optionally, send a delete request to your server
    selectedData.forEach(async (row) => {
      try {
        const response = await fetch(
          `http://localhost:3002/api/controls/${row.userId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    });
  };

  // Store gridApi to access selected rows
  const [gridApi, setGridApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "Equipment ID", editable: true },
    { field: "Electrification Category", cellStyle: { color: "gray",border:"none"  } },
    {
      headerName: "Domicile",
      cellStyle: { color: "gray",border:"none"  },
      field: "Simplified Domicile",
    },
    { field: "Replacement Year", editable: true, type: "number" },
    { field: "Expected Lifetime", editable: true, type: "number" },
    {
      field: "EV Purchase Cost pre-incentive",
      editable: true,
      type: "currency",
      valueFormatter: (params) => formatAsCurrency(params.value),
      cellStyle: { textAlign: "right" },
    },
    {
      field: "Default Replacement Allocation",
      editable: true,
      type: "currency",
      valueFormatter: (params) => formatAsCurrency(params.value),
      cellStyle: { textAlign: "right" },
    },
    {
      field: "HVIP, PG&E EV Fleet Program, and Other Incentives",
      type: "currency",
      editable: true,
      valueFormatter: (params) => formatAsCurrency(params.value),
      cellStyle: { textAlign: "right" },
    },
    {
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

  return (
    // wrapping container with theme & size
    <div
      className="ag-theme-quartz" // applying the grid theme
      style={{ height: 650 }} // the grid will fill the size of the parent container
    >
      <AgGridReact
        stopEditingWhenCellsLoseFocus={true}
        pagination={true}
        rowData={rowData}
        columnDefs={colDefs}
        onCellValueChanged={handleCellValueChanged}
        onGridReady={onGridReady}
      />
    </div>
  );
};

export default FleetGrid;
