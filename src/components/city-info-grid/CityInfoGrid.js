import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState, useEffect } from "react"; // React State Management
import useCityInfo from "../../store/useCityInfo";

const CityInfoGrid = () => {
  const { cityInfo } = useCityInfo();
  // Fetch data & update rowData state
  useEffect(() => {
    setRowData([cityInfo]);
  }, [cityInfo]);

  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([]);

  // Store gridApi to access selected rows
  const [gridApi, setGridApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "city_name", editable: true },
    { field: "city_image", editable: true },
    { field: "cost_benefit_min", editable: true, type: "number" },
    { field: "cost_benefit_max", editable: true, type: "number" },
    { field: "savings_max", editable: true, type: "number" },
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
      style={{ height: 92 }} // the grid will fill the size of the parent container
    >
      <AgGridReact
        stopEditingWhenCellsLoseFocus={true}
        rowData={rowData}
        columnDefs={colDefs}
        onCellValueChanged={handleCellValueChanged}
        onGridReady={onGridReady}
      />
    </div>
  );
};

export default CityInfoGrid;
