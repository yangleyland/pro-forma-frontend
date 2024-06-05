"use client"
import { ColumnDef } from "@tanstack/react-table"

export const columns = [
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    accessorKey: "site",
    header: "Site",
  },
  {
    accessorKey: "loan_amount",
    header: "Loan Amount",
  },
  {
    accessorKey: "trenching_costs",
    header: "Trenching Costs",
  },
  {
    accessorKey: "upgrade_cost_utility",
    header: "Upgrade Cost Utility",
  },
  {
    accessorKey: "upgrade_cost_customer",
    header: "Upgrade Cost Customer",
  },
  {
    accessorKey: "procurement_management_cost",
    header: "Procurement Management Cost",
  },
]
