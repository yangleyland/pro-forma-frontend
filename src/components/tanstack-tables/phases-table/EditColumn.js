import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";

const EditColumn = ({ table }) => {
  return (
    <Table variant="borderless" className="table-fixed w-20">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow
            className="hover:bg-white border-white"
            key={headerGroup.id}
          >
            {headerGroup.headers
              .filter((header) => header.id === "edit")
              .map((header) => (
                <TableHead className="border-white" key={header.id}>
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
          <TableRow className="hover:bg-white border-white" key={row.id}>
            {row
              .getVisibleCells()
              .filter((cell) => cell.column.id === "edit")
              .map((cell) => (
                <TableCell className=" border-white" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EditColumn;