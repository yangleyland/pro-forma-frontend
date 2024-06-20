"use client";

import {
  ColumnDef,
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
} from "../../components/ui/table";
import { getBackgroundColor } from "./getColor";

export function DataTable({ columns, data }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                  className={`p-4 text-nowrap text-left ${header.column.columnDef.meta?.className ?? ""}`}
                  key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, i) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                style={{
                  backgroundColor: getBackgroundColor(row.original.title), // Change 'Specific Title' to your condition
                }}
              >
                {row.getVisibleCells().map((cell) => {
                  const isTitle = cell.column.id === "title";
                  const alignmentClass = isTitle ? "text-left" : "text-right";

                  return (
                    <TableCell
                      className={`p-4 text-nowrap ${alignmentClass} ${cell.column.columnDef.meta?.className ?? ""}`}
                      key={cell.id}
                      style={{
                        color: `${cell.getValue()}`.startsWith("-")
                          ? "red"
                          : "inherit",
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, {
                        ...cell.getContext(),
                        // Always round numeric cell values to the nearest whole number
                        value:
                          typeof cell.getValue() === "number"
                            ? Math.round(cell.getValue())
                            : cell.getValue(),
                      })}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
