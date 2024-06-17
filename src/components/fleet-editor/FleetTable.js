import { useState, useEffect } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import TableCellInfo from "./TableCellInfo";
import EditCell from "./EditCell";
import useAuthStore from "../../store/useAuthStore";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
import "./sticky.css";

const columnHelper = createColumnHelper();

const paddedAndClampedCell = (info) => (
  <div className="p-4 w-60 truncate">{info.getValue()}</div>
);

const createTruncatedHeader =
  (headerText) =>
  ({ column }) => {
    return (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center justify-between whitespace-nowrap overflow-hidden text-left truncate max-w-60"
      >
        <span className="truncate">{headerText}</span>
        <ArrowUpDown className="ml-2 h-4 w-4 flex-shrink-0" />
      </Button>
    );
  };

const mainColumns = [
  columnHelper.accessor("Equipment ID", {
    header: "Equipment ID",
    cell: TableCellInfo,
    meta: {
      type: "text",
    },
  }),
  columnHelper.accessor("Exclude?", {
    header: "Exclude?",
    cell: TableCellInfo,
    meta: {
      type: "text",
    },
  }),
  columnHelper.accessor("Electrification Scenario", {
    header: "Electrification Scenario",
    cell: paddedAndClampedCell,
    meta: {
      type: "text",
    },
  }),
  columnHelper.accessor("Domicile Facility", {
    header: "Domicile Facility",
    cell: (info) => <div className="p-4 w-40 truncate">{info.getValue()}</div>,
    meta: {
      type: "text",
    },
  }),
  columnHelper.accessor("Replacement Year", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {" "}
          Replacement Year
          <ArrowUpDown className=" ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCellInfo,
    meta: {
      type: "text",
    },
  }),
  columnHelper.accessor("EV Purchase Cost pre-incentive", {
    header: createTruncatedHeader("EV Purchase Cost pre-incentive"),
    cell: TableCellInfo,
    meta: {
      type: "currency",
    },
  }),
  columnHelper.accessor("Default Replacement Allocation", {
    header: createTruncatedHeader("Default Replacement Allocation"),
    cell: TableCellInfo,
    meta: {
      type: "currency",
    },
  }),
  columnHelper.accessor("HVIP, PG&E EV Fleet Program, and Other Incentives", {
    header: createTruncatedHeader(
      "HVIP, PG&E EV Fleet Program, and Other Incentives"
    ),
    cell: TableCellInfo,
    meta: {
      type: "currency",
    },
  }),
  columnHelper.accessor("IRA Incentives", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          IRA Incentives
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCellInfo,
    meta: {
      type: "currency",
    },
  }),
  // columnHelper.display({
  //   id: "edit",
  //   cell: EditCell,
  //   sticky: "right",
  //   meta: {
  //     className: "",
  //   },
  // }),
];

const editColumn = columnHelper.display({
  id: "edit",
  cell: EditCell,
  meta: {
    className: " bg-white border-red-400",
  },
});

const EditColumn = ({ table }) => {
  return (
    <Table variant = "borderless" className="table-fixed w-20">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow className="hover:bg-white border-white" key={headerGroup.id}>
            {headerGroup.headers
              .filter((header) => header.id === "edit")
              .map((header) => (
                <TableHead
                  className="border-white"
                  key={header.id}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow  className="hover:bg-white border-white" key={row.id}>
            {row
              .getVisibleCells()
              .filter((cell) => cell.column.id === "edit")
              .map((cell) => (
                <TableCell
                className=" border-white"
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export const FleetTable = () => {
  
  const sticky = ["edit"];
  const [sorting, setSorting] = useState([]);
  const { data: authData } = useAuthStore();
  const [data, setData] = useState(() => [...authData] || []);
  const [originalData, setOriginalData] = useState(() => [...authData]);
  const [tempData, setTempData] = useState(() => [...authData]);
  useEffect(() => {
    setData([...authData] || []);
    setOriginalData([...authData] || []);
    setTempData([...authData] || []);
  }, [authData]);

  useEffect(() => {}, [tempData, data]);

  const [editedRows, setEditedRows] = useState({});

  const table = useReactTable({
    data,
    columns: [...mainColumns, editColumn],
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    meta: {
      editedRows,
      setEditedRows,
      revertData: (rowIndex, revert) => {
        if (revert) {
          setData((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
          setTempData((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
        } else {
          setOriginalData((old) =>
            old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
          );
        }
      },
      updateData: (rowIndex, columnId, value) => {
        // setData((old) =>
        //   old.map((row, index) => {
        //     if (index === rowIndex) {
        //       return {
        //         ...old[rowIndex],
        //         [columnId]: value,
        //       };
        //     }
        //     return row;
        //   })
        // );
        setTempData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
      syncData: async (rowIndex) => {
        return new Promise((resolve) => {
          setData((oldData) => {
            const newData = oldData.map((row, index) =>
              index === rowIndex ? tempData[rowIndex] : row
            );
            resolve(newData); // Return the updated data
            return newData;
          });
        });
      },
    },
  });
  return (
    <div className="grid grid-cols-12 gap-2">
    
      <div className="col-span-11">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
              {headerGroup.headers
                .filter((header) => header.column.columnDef.id !== "edit")
                .map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
            </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells()
                .filter((cell) => cell.column.columnDef.id !== "edit")
                .map((cell) => (
                  <TableCell
                    // className={`${cell.column.columnDef.meta?.className ?? ""}`}
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="col-span-1 h-full">
        <EditColumn table={table} />
      </div>
    </div>
  );
};
