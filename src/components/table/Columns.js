import TableCellInfo from "./TableCellInfo";
import EditCell from "./EditCell";
import ChargerCostCell from "./ChargerCostCell";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import useAuthStore from "../../store/useAuthStore";
import { DataTableColumnHeader } from "./ColumnHeader";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

const columnHelper = createColumnHelper();

export const createColumns = () => {
  const { controlsData } = useAuthStore.getState();
  const siteOptions =
    controlsData?.domiciles.map((option) => ({
      value: option,
      label: option,
    })) || [];

  const columns = [
    columnHelper.display({
      id: "edit",
      cell: EditCell,
      meta: {
        className: "sticky left-0",
      },
    }),
    columnHelper.accessor("year", {
      cell: TableCellInfo,
      meta: {
        type: "text",
      },
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Year
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    }),
    columnHelper.accessor("site", {
      header: "Site",
      cell: TableCellInfo,
      meta: {
        type: "select",
        options: siteOptions,
      },
    }),
    columnHelper.accessor("loan_amount", {
      header: "Loan Amount",
      cell: TableCellInfo,
      meta: {
        type: "currency",
      },
    }),
    columnHelper.accessor("trenching_costs", {
      header: "Trenching Costs",
      cell: TableCellInfo,
      meta: {
        type: "currency",
      },
    }),
    columnHelper.accessor("upgrade_cost_utility", {
      header: "Upgrade Cost Utility",
      cell: TableCellInfo,
      meta: {
        type: "currency",
      },
    }),
    columnHelper.accessor("upgrade_cost_customer", {
      header: "Upgrade Cost Customer",
      cell: TableCellInfo,
      meta: {
        type: "currency",
      },
    }),
    columnHelper.accessor("procurement_management_cost", {
      header: "Procurement Management Cost",
      cell: TableCellInfo,
      meta: {
        type: "currency",
      },
    }),
    columnHelper.accessor("port_less_than_10_kw", {
      header: "# of ports <10 kw",
      cell: TableCellInfo,
      meta: {
        type: "text",
      },
    }),
    columnHelper.accessor("port_10_20_kw", {
      header: "# of ports 10-20 kw",
      cell: TableCellInfo,
      meta: {
        type: "text",
      },
    }),
    columnHelper.accessor("port_25_kw", {
      header: "# of ports 25 kw",
      cell: TableCellInfo,
      meta: {
        type: "text",
      },
    }),
    columnHelper.accessor("port_180_200_kw", {
      header: "# of ports 180-200 kw",
      cell: TableCellInfo,
      meta: {
        type: "text",
      },
    }),
    columnHelper.accessor("incentives", {
      header: "Incentives",
      cell: TableCellInfo,
      meta: {
        type: "currency",
      },
    }),
    columnHelper.accessor("cost", {
      header: "Charger Cost",
      cell: ChargerCostCell,
    }),
    columnHelper.accessor("installCost", {
      header: "Installation Cost",
      cell: ChargerCostCell,
    }),
  ];
  return columns;
};
