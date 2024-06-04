"use client"

import { ColumnDef } from "@tanstack/react-table"
import useYears from "../../store/useYears.js"

export const columns = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]
