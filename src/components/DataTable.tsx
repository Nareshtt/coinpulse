"use client";

import { cn } from "@/lib/utils";
import { DataTableColumn, DataTableProps } from "@/types";

export default function DataTable<T>({
  columns,
  data,
  rowKey,
  tableClassName,
  headerRowClassName,
  headerCellClassName,
  bodyRowClassName,
  bodyCellClassName,
}: DataTableProps<T>) {
  return (
    <table className={cn("custom-scrollbar", tableClassName)}>
      <thead>
        <tr className={headerRowClassName}>
          {columns.map((column, index) => (
            <th key={index} className={cn("bg-[#1e1e2a] text-[#b026ff] py-4", headerCellClassName)}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={rowKey(row, rowIndex)}
            className={cn(
              "hover:bg-[#1e1e2a]/30 cursor-pointer border-b border-[#2a2a3a]",
              bodyRowClassName
            )}
          >
            {columns.map((column, colIndex) => (
              <td
                key={colIndex}
                className={cn(
                  "py-4",
                  colIndex === 0 && "pl-5",
                  colIndex === columns.length - 1 && "pr-5",
                  bodyCellClassName
                )}
              >
                {column.cell ? column.cell(row, rowIndex) : null}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
