// Table.js
"use client";
import React, { useMemo } from "react";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
  useRowSelect,
} from "react-table";
import GlobalFilter from "./GlobalFilter";
import Card from "./ui/Card";
import { IoChevronForward, IoChevronBackOutline } from "react-icons/io5";

const IndeterminateCheckbox = React.forwardRef<
  HTMLInputElement,
  { indeterminate: boolean }
>(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef<HTMLInputElement>(null);
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input
        type="checkbox"
        ref={resolvedRef}
        {...rest}
        className="table-checkbox"
      />
    </>
  );
});

const CustomTable = ({ columns, data, title }) => {
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [{ id: "id", desc: false }],
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    prepareRow,
  } = tableInstance;

  console.log("headerGroup", headerGroups);

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <Card>
      <div className="md:flex justify-between items-center mb-3 mt-5">
        <h4 className="card-title">{title}</h4>
        <div className="w-96">
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden ">
            <table
              className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
              {...getTableProps}
            >
              <thead className="bg-slate-50 dark:bg-slate-700">
                {headerGroups.map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    {...headerGroup.getHeaderGroupProps()}
                  >
                    {headerGroup.headers.map((column) => (
                      <th
                        key={column.id}
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        scope="col"
                        className=" table-th text-left"
                      >
                        {column.render("Header")}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " 🔽"
                              : " 🔼"
                            : ""}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody
                className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                {...getTableBodyProps}
              >
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr key={row.id} {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td
                          key={cell.column.id}
                          {...cell.getCellProps()}
                          className="table-td"
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
        <div className=" flex items-center space-x-3 rtl:space-x-reverse">
          <select
            className="form-control py-2 w-max"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 25, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Page{" "}
            <span>
              {pageIndex + 1} of {pageOptions.length}
            </span>
          </span>
        </div>
        <div className="flex justify-between">
          <div className="-mt-px flex">
            <a
              className="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              <IoChevronBackOutline
                className="mr-3 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Previous
            </a>
          </div>
          <div className="hidden md:-mt-px md:flex">
            {pageOptions.map((page, pageIdx) => {
              // Set the threshold for displaying the ellipsis and hiding intermediate page numbers
              const threshold = 3;
              const totalPageOptions = pageOptions.length;

              if (
                pageOptions.length <= threshold ||
                Math.abs(pageIdx - pageIndex) < threshold
              ) {
                return (
                  <a
                    key={pageIdx}
                    className={`inline-flex items-center border-t-2 ${
                      pageIdx === pageIndex
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } px-4 pt-4 text-sm font-medium`}
                    aria-current={pageIdx === pageIndex ? "page" : undefined}
                    onClick={() => gotoPage(pageIdx)}
                  >
                    {page + 1}
                  </a>
                );
              } else if (pageIdx === 0 || pageIdx === 1 || pageIdx === 2) {
                // Show the first three page numbers
                return (
                  <a
                    key={pageIdx}
                    className={`inline-flex items-center border-t-2 ${
                      pageIdx === pageIndex
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } px-4 pt-4 text-sm font-medium`}
                    aria-current={pageIdx === pageIndex ? "page" : undefined}
                    onClick={() => gotoPage(pageIdx)}
                  >
                    {page + 1}
                  </a>
                );
              } else if (
                pageIdx === totalPageOptions - 3 ||
                pageIdx === totalPageOptions - 2 ||
                pageIdx === totalPageOptions - 1
              ) {
                // Show the last three page numbers
                return (
                  <a
                    key={pageIdx}
                    className={`inline-flex items-center border-t-2 ${
                      pageIdx === pageIndex
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } px-4 pt-4 text-sm font-medium`}
                    aria-current={pageIdx === pageIndex ? "page" : undefined}
                    onClick={() => gotoPage(pageIdx)}
                  >
                    {page + 1}
                  </a>
                );
              } else if (
                pageIdx === totalPageOptions - threshold - 1 &&
                totalPageOptions > 2 * threshold + 1
              ) {
                // Show a single ellipsis for intermediate pages when there are more than 2 * threshold + 1 total pages
                return (
                  <span
                    key={pageIdx}
                    className="inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium text-gray-500"
                  >
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>
          <div className="-mt-px flex justify-end">
            <a
              className="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              Next
              <IoChevronForward
                className="ml-3 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CustomTable;
