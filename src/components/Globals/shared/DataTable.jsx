"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableFooter,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/Globals/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Globals/ui/select";
import { truncateText } from "@/utils";
import { useState } from "react";

function DataTable({ columns, data, handShowProfileModal, showPagination }) {
  const isActive = true;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const handleRowClick = (rowData) => {
    handShowProfileModal(rowData?.patientId);
  };

  return (
    <div className="">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className="text-sm font-[600] whitespace-nowrap"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table?.getRowModel()?.rows?.length ? (
            table?.getRowModel()?.rows?.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={(e) => {
                  handleRowClick(row.original);
                  e.stopPropagation();
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <div className="max-w-full overflow-hidden truncate text-ellipsis">
                      {flexRender(
                        cell.column.columnDef.cell,
                        truncateText(cell.getContext())
                      )}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {showPagination && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={12} className="bg-white">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center text-gray-400 text-[10px] md:text-sm">
                    <p className="pr-2">Showing: </p>
                    <Select className="border-transparent focus:border-transparent focus:ring-0">
                      <SelectTrigger className="w-[50px] h-[35px]">
                        <SelectValue placeholder="20" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="est">30</SelectItem>
                        <SelectItem value="cst">40</SelectItem>
                        <SelectItem value="edit">50</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="pl-2">of 160</span>
                  </div>
                  <div>
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            className={`text-[12px] text-brand-300 hover:bg-brand-1000 hover:text-white`}
                          />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            className={`px-3 py-2 mx-1 text-brand-300 ${
                              isActive
                                ? "text-white rounded-md bg-brand-1000"
                                : ""
                            }`}
                          >
                            1
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#" isActive>
                            2
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            className={`text-[12px] text-brand-300 hover:bg-brand-1000 hover:text-white`}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
}

export default DataTable;
