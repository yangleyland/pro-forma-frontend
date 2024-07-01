import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState, useEffect, useRef, useCallback } from "react"; // React State Management
import useAuthStore from "../../store/useAuthStore";
import useColumnState from "../../store/useColumnState";

const formatAsCurrency = (number) => {
  if (number === null || number === undefined) return "";
  return `$${Math.floor(number).toLocaleString()}`;
};
const isEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

const FleetGrid = () => {
  const { fleet, setFleetState } = useColumnState();
  const { data, updateData,patchData } = useAuthStore();
  const [shadow, setShadow] = useState(true);
  const [history,setHistory]  = useState([]);
  const gridRef = useRef(null);
  // Fetch data & update rowData state
  useEffect(() => {
    setRowData(data);
  }, [data]); //maybe change this

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        undoEdit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [history]);
  
  const undoEdit = useCallback(() => {
    

    if (history.length === 0) return;
    const val = history[history.length-1];
    console.log("val",val)
    patchData(val.equipment_id,val.field,val.value);
    setHistory(history.slice(0,history.length-1));
    console.log("pressed",5483,"Equipment ID","000",val.equipment_id,val.field,val.value)
    const event={
      data:{
        equipment_id:val.equipment_id
      },
      colDef:{
        field:val.field
      },
      newValue:val.value,
    }
    handleCellValueChanged(event,true);

  }, [history]);

  useEffect(() => {
    console.log(history)
  }, [history]);

  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState(null);

  // Store gridApi to access selected rows
  const [gridApi, setGridApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    params.api.addEventListener("bodyScroll", onBodyScroll);
    if (fleet.pagination) {
      params.api.paginationGoToPage(fleet.pagination.page);
    }

    // Add scroll event listener
    params.api.addEventListener("bodyScroll", onBodyScroll);
  };
  const onBodyScroll = (event) => {
    const horizontalScrollPosition = event.api.getHorizontalPixelRange();
    // const scrollWidth = event.api.gridPanel.getBodyClientRect().width;
    const size = event.api.getColumnState();
    // const maxScrollLeft = horizontalScrollPosition.right - scrollWidth;
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

  const handleCellValueChanged = async (event,undo=false) => {
    const equipment_id = event.data.equipment_id;
    const field = event.colDef.field;
    let value = event.newValue;


    if (value === null || value === undefined) {
      value = 0;
      event.node.setDataValue(field, value); // Immediately update the cell value in the grid
    }
    console.log(field, value, equipment_id);
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
            equipment_id: equipment_id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update data");
      }
      if (!undo){
        setHistory([...history,{equipment_id: equipment_id, field, value:event.oldValue}]);
      }
      const result = await response.json();
      console.log("Update successful:", result);
      updateData(result[0]);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const onGridPreDestroyed = (event) => {
    setFleetState(event.state);
    console.log(event.state);
  };

  const onStateUpdated = (params) => {
    console.log("State updated", params.state);
  };
  

  return (
    // wrapping container with theme & size
    <div
      className="ag-theme-quartz relative h-[95%]" // applying the grid theme
    >
      <AgGridReact
        initialState={fleet}
        ref={gridRef}
        autoSizeStrategy={
          isEmpty(fleet) ? { type: "fitCellContents", skipHeader: false } : {}
        }
        stopEditingWhenCellsLoseFocus={true}
        pagination={true}
        rowData={rowData}
        columnDefs={colDefs}
        onCellValueChanged={handleCellValueChanged}
        onGridReady={onGridReady}
        suppressColumnVirtualisation={true}
        onGridPreDestroyed={onGridPreDestroyed}
        onStateUpdated={onStateUpdated}
        undoRedoCellEditing={true}
        undoRedoCellEditingLimit={20}
      />
      {shadow && (
        <div className="h-full absolute top-0 right-0 bottom-0 w-5 bg-gradient-to-r from-transparent to-black/10 pointer-events-none z-20 rounded-lg"></div>
      )}
    </div>
  );
};

export default FleetGrid;
