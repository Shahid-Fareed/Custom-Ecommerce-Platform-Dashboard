import React, { useEffect, useState } from "react";
import {
  FaAngleDown,
  FaAngleLeft,
  FaAngleRight,
  FaAngleUp,
  FaCheck,
} from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { SlPlus } from "react-icons/sl";
import {
  MdOutlineDeleteOutline,
  MdOutlineImportExport,
  MdOutlineRemoveRedEye,
  MdOutlineEdit,
} from "react-icons/md";
import { LiaEditSolid } from "react-icons/lia";
import Popup from "./ui/Popup";
import Button from "./ui/Button";

interface Customer {
  name: string;
}

interface OrderData {
  name: string;
  id: number;
  order: number;
  customer?: Customer;
  date: string;
  quantity: number;
  amount: string;
  status: string;
  action: null | any; // Update this based on the actual action type
}

const PAGE_SIZE = 10; // Number of items per page

const CustomTable2: React.FC = ({ tableData, headers }: any) => {
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);
  console.log("pageSize", typeof pageSize);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("id");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [search, setSearch] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [data, setData] = useState([]);
  const [totalResult, setTotalResult] = useState<number>(data?.length);
  const [editPopupVisible, setEditPopupVisible] = useState(false);
  const [viewPopupVisible, setViewPopupVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState<OrderData | null>(null);
  const [editedRow, setEditedRow] = useState<OrderData | null>(null);
  const [headerToFilter, setHeaderToFilter] = useState<string>("");

  console.log("selectedRow", selectedRow);

  console.log("data", data);


  useEffect(() => { 
    setData(tableData)
  }, [tableData])

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  // const filteredData = data?.filter((item) => {
  //   let statusMatchesFilter;

  //   const searchRegex = new RegExp(search, "i");
  //   const searchMatches =
  //     searchRegex.test(item?.customer?.name) ||
  //     searchRegex.test(item?.status) ||
  //     searchRegex.test(item?.date) ||
  //     searchRegex.test(item?.amount) ||
  //     searchRegex.test(item?.id.toString());

  //   if (selectedFilter === "all") {
  //     statusMatchesFilter = searchMatches;
  //   } else {
  //     statusMatchesFilter =
  //       selectedFilter !== "" ? item.status === selectedFilter : true;
  //   }
  //   return statusMatchesFilter && searchMatches;
  // });

  const filteredData = data?.filter((item) => {
    let statusMatchesFilter;
    let searchMatches = false;

    if (headers && headers.length > 0) {
      searchMatches = headers.some((header: any) => {
        const searchRegex = new RegExp(search, "i");
        return searchRegex.test(item?.[header]);
      });
    }

    if (selectedFilter === "all") {
      statusMatchesFilter = searchMatches;
    } else {
      statusMatchesFilter =
        selectedFilter !== "" ? item.status === selectedFilter : true;
    }
    return statusMatchesFilter && searchMatches;
  });

  console.log("filteredData", filteredData)

  const sortedData = [...(filteredData || [])].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue, undefined, { numeric: true })
        : bValue.localeCompare(aValue, undefined, { numeric: true });
    } else {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }
  });

  // Calculate pagination
  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(
    startIndex + pageSize - 1,
    (sortedData || []).length
  );
  const paginatedData = sortedData.slice(startIndex - 1, endIndex);

  const totalPages = Math.ceil((sortedData.length || 0) / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const hadleFilter = (value: string) => {
    setSelectedFilter(value);
  };

  function getStatusCounts(data: OrderData[] | undefined) {
    const statusCounts: Record<string, number> = {};

    if (data) {
      data.forEach((item) => {
        const status = item.status;

        if (statusCounts[status]) {
          statusCounts[status]++;
        } else {
          statusCounts[status] = 1;
        }
      });
    }

    return statusCounts;
  }

  const counts = getStatusCounts(data);
  console.log("count", counts);

  const handleDelete = (value: number) => {
    console.log("value", value);

    let new_data = data.filter((el) => el.id !== value);

    setData(new_data);
  };

  // Function to handle export
  const handleExport = () => {
    // Convert data to CSV format
    const csvData = data.map((item) => {
      return `${item.id},${item.order},"${item.name}",${item.date},${item.quantity},${item.amount},${item.status}`;
    });

    // Create a CSV file content
    const csvContent = `ID,Order,Customer,Date,Quantity,Amount,Status\n${csvData.join(
      "\n"
    )}`;

    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a link element to trigger the download
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "table_data.csv";

    // Append the link to the body and click it to trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderStatus = (status: string) => {
    // Customize rendering of status here
    switch (status) {
      case "pending":
        return "Pending";
      case "due":
        return "Due";
      case "success":
        return "Success";
      case "canceled":
        return "Canceled";
      default:
        return status;
    }
  };

  const getStatusStyle = (status: string) => {
    // Customize styling of status here
    switch (status) {
      case "pending":
        return "text-red-700 bg-red-100 border border-red-400 rounded-md";
      case "due":
        return "text-pink-700 bg-pink-100 border border-pink-400 rounded-md";
      case "success":
        return "text-green-700 bg-green-100 border border-green-400 rounded-md";
      case "canceled":
        return "text-gray-700 bg-gray-100 border border-gray-400 rounded-md";
      default:
        return "";
    }
  };
  // popup eidt and view popup function
  const openEditPopup = (row: OrderData) => {
    setSelectedRow(row);
    setEditedRow({ ...row });
    setEditPopupVisible(true);
  };

  const closeEditPopup = () => {
    setSelectedRow(null);
    setEditPopupVisible(false);
  };

  const openViewPopup = (row: OrderData, field: string) => {
    //setSelectedField(field);
    setSelectedRow(row);
    setViewPopupVisible(true);
  };

  const closeViewPopup = () => {
    setSelectedRow(null);
    setViewPopupVisible(false);
  };
  // for full selected row
  // const handleEditInputChange = (key: string, value: string) => {
  //   if (editedRow) {
  //     setEditedRow((prevRow: any) => ({
  //       ...prevRow,
  //       [key]: value,
  //     }));
  //   }
  // };

  // edit based on header field
  const handleEditInputChange = (key: string, value: string) => {
    if (editedRow) {
      if (headers.includes(key)) {
        setEditedRow((prevRow: any) => ({
          ...prevRow,
          [key]: value,
        }));
      }
    }
  };

  const handleEditSave = () => {
    if (editedRow) {
      setData((prevData) =>
        prevData.map((row) => (row.id === editedRow.id ? editedRow : row))
      );
    }
    closeEditPopup();
  };

  return (
    <>
      <div>
        <div className="grid grid-cols-2 m-3">
          <div>
            <div className="flex gap-2 items-center"></div>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-5">
          <div
            className={`border rounded-md capitalize w-full p-5 cursor-pointer
              ${selectedFilter === "all"
                ? "border-blue-300 text-blue-600"
                : " border-gray-300"
              }`}
            onClick={() => hadleFilter("all")}
          >
            all{" "}
            <span className="w-full float-left text-lg font-bold">
              {data.length}
            </span>
          </div>
          <div
            className={`border rounded-md capitalize w-full p-5 cursor-pointer
              ${selectedFilter === "success"
                ? "border-blue-300 text-blue-600"
                : " border-gray-300"
              }`}
            onClick={() => hadleFilter("success")}
          >
            success
            <span className="w-full float-left text-lg font-bold">
              {counts.success}
            </span>
          </div>
          <div
            className={`border rounded-md capitalize w-full p-5 cursor-pointer
            ${selectedFilter === "canceled"
                ? "border-blue-300 text-blue-600"
                : " border-gray-300"
              }`}
            onClick={() => hadleFilter("canceled")}
          >
            canceled
            <span className="w-full float-left text-lg font-bold">
              {counts.canceled}
            </span>
          </div>
          <div
            className={`border rounded-md capitalize w-full p-5 cursor-pointer
            ${selectedFilter === "due"
                ? "border-blue-300 text-blue-600"
                : " border-gray-300"
              }`}
            onClick={() => hadleFilter("due")}
          >
            due
            <span className="w-full float-left text-lg font-bold">
              {counts.due}
            </span>
          </div>
          <div
            className={`border rounded-md capitalize w-full p-5 cursor-pointer
            ${selectedFilter === "pending"
                ? "border-blue-300 text-blue-600"
                : " border-gray-300"
              }`}
            onClick={() => hadleFilter("pending")}
          >
            pending
            <span className="w-full float-left text-lg font-bold">
              {counts.pending}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          {/* <div className="flex gap-2 items-center my-5" id="filters">
            <button className="flex gap-1 items-center rounded-full border border-dashed border-gray-300 py-[2px] px-2 text-sm">
              <span className="text-xs">
                <SlPlus />
              </span>
              Date
            </button>
            <button className="flex gap-1 items-center rounded-full border border-dashed border-gray-300 py-[2px] px-2 text-sm">
              <span className="text-xs">
                <SlPlus />
              </span>
              Order
            </button>
            <button className="flex gap-1 items-center rounded-full border border-dashed border-gray-300 py-[2px] px-2 text-sm">
              <span className="text-xs">
                <SlPlus />
              </span>
              Amount
            </button>
            <button className="flex gap-1 items-center rounded-full border border-dashed border-gray-300 py-[2px] px-2 text-sm">
              <span className="text-xs">
                <SlPlus />
              </span>
              Status
            </button>
            <button className="flex gap-1 items-center rounded-full border border-dashed border-gray-300 py-[2px] px-2 text-sm">
              <span className="text-xs">
                <SlPlus />
              </span>
              Name
            </button>
          </div> */}
          <div className="flex my-3 w-full justify-start ">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex gap-1">
                <input
                  type="text"
                  placeholder="Search..."
                  className="py-1 px-4 rounded-lg border-2 border-gray-100 focus:outline-none focus:border-black"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
          <button
            onClick={handleExport}
            className="border border-gray-200 py-1 px-2 pr-3 flex items-center gap-1"
          >
            <span className="text-lg">
              <MdOutlineImportExport />
            </span>
            Export
          </button>
        </div>
        <div>
          {filteredData.length === 0 ? (
            <div className="flex items-center justify-center bg-white h-40">
              <p className="text-black font-[Poppins] text-3xl font-semibold">
                No search results found.
              </p>
            </div>
          ) : (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="bg-slate-50 text-[#2a2a2a] px-3 py-1 text-xs tracking-wider">
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      className=""
                      onClick={() => handleSort(header)}
                    >
                      <span className="flex">
                        {header}
                        {sortBy === header && (
                          <span>
                            {sortOrder === "asc" ? (
                              <FaAngleDown size={13} />
                            ) : (
                              <FaAngleUp size={13} />
                            )}
                          </span>
                        )}
                      </span>
                    </th>
                  ))}
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData?.map((item, idx) => (
                  <tr
                    className="w-full px-2 py-1 border-b border-b-gray-100 text-sm"
                    key={idx}
                  >
                    {headers.map((header, index) => {
                      console.log("test", typeof item["customer"]);
                      return (
                        <td key={index} className="py-1">
                          {header === "status" ? (
                            // Render status with conditional styling/icons
                            <div className="flex gap-3">
                              {item?.amount ? item?.amount : null}
                              <span
                                className={`px-1 py-[2px] justify-center flex items-center text-xs capitalize ${getStatusStyle(
                                  item[header]
                                )}`}
                              >
                                {renderStatus(item[header])}
                              </span>
                            </div>
                          ) : (
                            // ) : typeof item["customer"] == "object" ? (
                            //   <>
                            //     <span>{item["customer"]?.name}</span>
                            //   </>
                            // Render other columns
                            <span>{item[header]}</span>
                          )}
                        </td>
                      );
                    })}
                    <td>
                      <button
                        onClick={() => openViewPopup(item)}
                        className="text-gray-500 hover:underline ml-2"
                      >
                        <MdOutlineRemoveRedEye />
                      </button>
                      <button
                        onClick={() => openEditPopup(item)}
                        className="text-gray-500 hover:underline ml-2"
                      >
                        <LiaEditSolid />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-gray-500 hover:underline ml-2"
                      >
                        <MdOutlineDeleteOutline />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex}</span> to{" "}
                <span className="font-medium">{endIndex}</span> of{" "}
                <span className="font-medium">{sortedData.length}</span> results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  <FaAngleLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                {Array.from(
                  { length: totalPages > 5 ? 5 : totalPages },
                  (_, i) => i + 1
                ).map((page) => (
                  <div
                    key={page}
                    onClick={() => handlePageChange(page)}
                    aria-current={page === currentPage ? "page" : undefined}
                    className={`relative z-10 inline-flex items-center ${page === currentPage
                        ? "bg-black text-white"
                        : "bg-white text-gray-900"
                      } cursor-pointer px-4 py-2 text-sm font-semibold border`}
                  >
                    {page}
                  </div>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  <FaAngleRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
        {/* Pagination */}
      </div>

      {/* Edit Popup */}
      {editPopupVisible && selectedRow && (
        <Popup isOpen={editPopupVisible} onClose={closeEditPopup}>
          <h2 className="w-full bg-blue-400 text-white p-3">Edit Row</h2>
          {Object.entries(selectedRow)
            .filter(([key]) => headers.includes(key))
            .map(([key, value]) => {
              return (
                <>
                  {value !== null ? (
                    <>
                      <div
                        key={key}
                        className="w-[400px] p-3 flex items-center"
                      >
                        <label className="block text-sm font-medium text-gray-700 capitalize w-[20%]">
                          {key}
                        </label>
                        <input
                          type="text"
                          value={editedRow?.[key] || ""}
                          onChange={(e) =>
                            handleEditInputChange(key, e.target.value)
                          }
                          className="mt-1 p-2 border rounded-md w-full"
                        />
                      </div>
                    </>
                  ) : null}
                </>
              );
            })}
          <div className="p-3">
            <Button
              onClick={handleEditSave}
              text={"Save Changes"}
              className="btn-sm"
            />
          </div>
        </Popup>
      )}
      {/* View Popup */}
      {viewPopupVisible && selectedRow && (
        <Popup isOpen={viewPopupVisible} onClose={closeViewPopup}>
          <div className="w-[400px]">
            <h2 className="w-full bg-blue-400 text-white p-3">View Row</h2>
            <div className="p-5">
              {Object.entries(selectedRow).map(([key, value]) => (
                // <p key={key}>{`${key}: ${value}`}</p>
                <div key={key} className="mb-2 flex items-center">
                  <p className="text-sm font-semibold text-gray-700 w-[50%]">
                    {key}:
                  </p>
                  <p className="text-sm text-gray-500 w-[50%]">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </Popup>
      )}
    </>
  );
};

export default CustomTable2;
