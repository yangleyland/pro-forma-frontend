import { useState, useEffect } from "react";
import {
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
import usePhases from "../../store/usePhases";
import { FooterCell } from "./FooterCell";
import useAuthStore from "../../store/useAuthStore";
import { createColumns } from "./Columns";

export const PhaseTable = () => {
  const { controlsData } = useAuthStore();
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    setColumns(createColumns());
  }, [controlsData]);
  // const columns = createColumns();
  const { phases, addPhase } = usePhases();

  const { user } = useAuthStore();
  const [data, setData] = useState(() => [...phases] || []);
  const [originalData, setOriginalData] = useState(() => [...phases]);
  useEffect(() => {
    setData([...phases] || []);
    setOriginalData([...phases] || []);
  }, [phases]);

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
      addRow: () => {
        const newRow = {
          user_id: user.id,
          year: 2024,
          site: "",
          loan_amount: 0,
          trenching_costs: 0,
          upgrade_cost_utility: 0,
          upgrade_cost_customer: 0,
          procurement_management_cost: 0,
          port_less_than_10_kw: 0,
          port_10_20_kw: 0,
          port_25_kw: 0,
          port_180_200_kw: 0,
          incentives: 0,
        };
        addPhase(newRow);
        const setFunc = (old) => [...old, newRow];
        setData(setFunc);
        setOriginalData(setFunc);
      },
      removeRow: (rowIndex) => {
        const setFilterFunc = (old) =>
          old.filter((_row, index) => index !== rowIndex);
        setData(setFilterFunc);
        setOriginalData(setFilterFunc);
      },
    },
  });
  return (
    <Table className="">
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
      <TableFooter>
        <TableRow>
          <TableHead
            colSpan={table.getCenterLeafColumns().length}
            align="right"
          >
            <FooterCell table={table} />
          </TableHead>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
