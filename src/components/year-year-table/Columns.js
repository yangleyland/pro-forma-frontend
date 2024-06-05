"use client"

import { ColumnDef } from "@tanstack/react-table"


export const columns = [];
const years = Array.from({ length: 17 }, (_, index) => 2024 + index);
columns.push({
    accessorKey: "title",
    header: "",
});
years.forEach(year => {
    columns.push({
        accessorKey: year.toString(),
        header: year.toString(),
    });
});


