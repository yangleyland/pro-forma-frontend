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

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.display({
    id: "edit",
    cell: EditCell,
    meta: {
      className: "sticky left-0",
    },
  }),
  columnHelper.accessor("Equipment ID", {
    header: "Equipment ID",
    cell: TableCellInfo,
    meta: {
      type: "text",
    },
  }),
  // columnHelper.accessor("Exclude?", {
  //   header: "Exclude?",
  //   cell: TableCellInfo,
  //   meta: {
  //     type: "text",
  //   },
  // }),
  columnHelper.accessor("Electrification Scenario", {
    header: "Electrification Scenario",
    meta: {
      type: "text",
    },
  }),
  columnHelper.accessor("Domicile Facility", {
    header: "Domicile Facility",
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
          Replacement Year
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCellInfo,
    meta: {
      type: "text",
    },
  }),
  columnHelper.accessor("EV Purchase Cost pre-incentive", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          EV Purchase Cost pre-incentive
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCellInfo,
    meta: {
      type: "currency",
    },
  }),
  columnHelper.accessor("Default Replacement Allocation", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Default Replacement Allocation
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCellInfo,
    meta: {
      type: "currency",
    },
  }),
  columnHelper.accessor("HVIP, PG&E EV Fleet Program, and Other Incentives", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          HVIP, PG&E EV Fleet Program, and Other Incentives
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
];

export const FleetTable = () => {
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


  const [editedRows, setEditedRows] = useState({});

  const table = useReactTable({
    data,
    columns,
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
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead className="text-nowrap" key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
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
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell className="" key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
