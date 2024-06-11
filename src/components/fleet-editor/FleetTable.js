import { useState, useEffect } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "../../components/ui/table";
import TableCellInfo from "./TableCellInfo";
import EditCell from "./EditCell";
import usePhases from "../../store/usePhases";
import useAuthStore from "../../store/useAuthStore";

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
  columnHelper.accessor("Exclude?", {
    header: "Exclude?",
    cell: TableCellInfo,
    meta: {
      type: "text",
    },
  }),
  columnHelper.accessor("Replacement Year", {
    header: "Replacement Year",
    cell: TableCellInfo,
    meta: {
      type: "text",
    },
  }),
  columnHelper.accessor("EV Purchase Cost pre-incentive", {
    header: "EV Purchase Cost pre-incentive",
    cell: TableCellInfo,
    meta: {
      type: "currency",
    },
  }),
  columnHelper.accessor("Default Replacement Allocation", {
    header: "Default Replacement Allocation",
    cell: TableCellInfo,
    meta: {
      type: "currency",
    },
  }),
  columnHelper.accessor("HVIP, PG&E EV Fleet Program, and Other Incentives", {
    header: "HVIP, PG&E EV Fleet Program, and Other Incentives",
    cell: TableCellInfo,
    meta: {
      type: "currency",
    },
  }),
  columnHelper.accessor("IRA Incentives", {
    header: "IRA Incentives",
    cell: TableCellInfo,
    meta: {
      type: "currency",
    },
  }),
];

export const FleetTable = () => {
  const { user, data: authData } = useAuthStore();
  const [data, setData] = useState(() => [...authData] || []);
  const [originalData, setOriginalData] = useState(() => [...authData]);
  useEffect(() => {
    setData([...authData] || []);
    setOriginalData([...authData] || []);
  }, [authData]);

  const [editedRows, setEditedRows] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
        } else {
          setOriginalData((old) =>
            old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
          );
        }
      },
      updateData: (rowIndex, columnId, value) => {
        setData((old) =>
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
