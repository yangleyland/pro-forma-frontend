import { ColumnDef } from "@tanstack/react-table";
import useYears from '../../store/useYears';

export const createColumns = () => {
  const { YEARS } = useYears.getState();
  const columns = [];

  columns.push({
    accessorKey: "title",
    header: "",
  });

  YEARS.forEach(year => {
    columns.push({
      accessorKey: year.toString(),
      header: year.toString(),
      cell: info => {
        const value = info.getValue();
        return typeof value === 'number' ? Math.round(value) : value;
      }
    });
  });

  return columns;
};
