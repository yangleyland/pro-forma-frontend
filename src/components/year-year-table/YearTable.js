import React, { useEffect } from 'react';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from "@tanstack/react-table";
  
import useYears from '../../store/useYears';
import useYearOverYear from '../../store/useYearOverYear';

const YearTable = () => {
  const { YEARS } = useYears();
  const {
    estimatedElectricVehicles,
    costOfElectricVehicles,
    loanAmount,
    chargerPurchaseCosts,
  } = useYearOverYear();



  const columns = React.useMemo(
    () => [
      {
        Header: 'Years',
        accessor: 'year', // accessor is the "key" in the data
      },
    ],
    []
  );

  const data = React.useMemo(() => {
    const YEARS = Object.keys(estimatedElectricVehicles);
    return YEARS.map((year) => ({
      year,
      estimatedElectricVehicles: estimatedElectricVehicles[year],
      costOfElectricVehicles: costOfElectricVehicles[year],
      loanAmount: loanAmount[year],
      chargerPurchaseCosts: chargerPurchaseCosts[year],
    }));
  }, [estimatedElectricVehicles, costOfElectricVehicles, loanAmount, chargerPurchaseCosts]);

  const tableInstance = useReactTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default YearTable;
