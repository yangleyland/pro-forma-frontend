import { ColumnDef } from "@tanstack/react-table";
import useYears from '../../store/useYears';

export const createColumns = () => {
  const { YEARS,CURRENT_YEAR } = useYears.getState();
  const columns = [];

  columns.push({
    accessorKey: "title",
    header: "",
    meta: {
      className:
        "sticky top-0 left-0 z-20 bg-white border-r border-gray-200 shadow-sm",
     },
  });

  YEARS.forEach(year => {
    columns.push({
      accessorKey: year.toString(),
      header: year.toString(),
      cell: info => {
        const value = info.getValue();
        return typeof value === 'number' ? Math.round(value) : value;
      },
      meta: {
        className: year < CURRENT_YEAR ? 'bg-gray-400' : '',
      },
    });
  });

  return columns;
};
