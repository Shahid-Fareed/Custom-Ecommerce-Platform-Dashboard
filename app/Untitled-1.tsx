// components/CustomTable.tsx
import React, { useEffect, useState } from "react";
import EditRowModal from "./EditRowModal";
import ViewRowModal from "./ViewRowModal";

// interface CustomTableProps {
//   data: TableRow[];
// }


const data1: TableRow[] = [
  {
    id: 40,
    order: 423,
    customer: {
    name: "Jenny Wilson"
    },
    date: "3/2/2022",
    quantity: 8,
    amount: "$2700.12",
    status: "canceled",
    action: null,
  },
  {
    id: 41,
    order: 703,
    customer: {
    name: "Jenny Wilson"
    },
    date: "12/8/2021",
    quantity: 8,
    amount: "$4508.13",
    status: "canceled",
    action: null,
  },
  {
    id: 42,
    order: 792,
    customer: {
    name: "Jenny Wilson"
    },
    date: "11/22/2021",
    quantity: 11,
    amount: "$4938.04",
    status: "due",
    action: null,
  },
  {
    id: 2,
    order: 238,
    customer: {
    name: "Jenny Wilson"
    },
    date: "2/6/2022",
    quantity: 13,
    amount: "$2215.78",
    status: "due",
    action: null,
  },
  {
    id: 3,
    order: 339,
    customer: {
    name: "Jenny Wilson"
    },
    date: "9/6/2021",
    quantity: 1,
    amount: "$3183.60",
    status: "due",
    action: null,
  },
  {
    id: 4,
    order: 365,
    customer: {
    name: "Jenny Wilson"
    },
    date: "11/7/2021",
    quantity: 13,
    amount: "$2587.86",
    status: "canceled",
    action: null,
  },
  {
    id: 5,
    order: 513,
    customer: {
    name: "Jenny Wilson"
    },
    date: "5/6/2022",
    quantity: 12,
    amount: "$3840.73",
    status: "paid",
    action: null,
  },
  {
    id: 6,
    order: 534,
    customer: {
    name: "Jenny Wilson"
    },
    date: "2/14/2022",
    quantity: 12,
    amount: "$4764.18",
    status: "canceled",
    action: null,
  },
  {
    id: 1,
    order: 951,
    customer: {
    name: "Jenny Wilson"
    },
    date: "3/26/2022",
    quantity: 13,
    amount: "$1779.53",
    status: "paid",
    action: null,
  },
  {
    id: 2,
    order: 238,
    customer: {
    name: "Jenny Wilson"
    },
    date: "2/6/2022",
    quantity: 13,
    amount: "$2215.78",
    status: "due",
    action: null,
  },
  {
    id: 3,
    order: 339,
    customer: {
    name: "Jenny Wilson"
    },
    date: "9/6/2021",
    quantity: 1,
    amount: "$3183.60",
    status: "due",
    action: null,
  },
  {
    id: 4,
    order: 365,
    customer: {
    name: "Jenny Wilson"
    },
    date: "11/7/2021",
    quantity: 13,
    amount: "$2587.86",
    status: "canceled",
    action: null,
  },
  {
    id: 5,
    order: 513,
    customer: {
    name: "Jenny Wilson"
    },
    date: "5/6/2022",
    quantity: 12,
    amount: "$3840.73",
    status: "paid",
    action: null,
  },
  {
    id: 6,
    order: 534,
    customer: {
    name: "Jenny Wilson"
    },
    date: "2/14/2022",
    quantity: 12,
    amount: "$4764.18",
    status: "canceled",
    action: null,
  },
  {
    id: 1,
    order: 951,
    customer: {
    name: "Jenny Wilson"
    },
    date: "3/26/2022",
    quantity: 13,
    amount: "$1779.53",
    status: "paid",
    action: null,
  },
  {
    id: 2,
    order: 238,
    customer: {
    name: "Jenny Wilson"
    },
    date: "2/6/2022",
    quantity: 13,
    amount: "$2215.78",
    status: "due",
    action: null,
  },
  {
    id: 3,
    order: 339,
    customer: {
    name: "Jenny Wilson"
    },
    date: "9/6/2021",
    quantity: 1,
    amount: "$3183.60",
    status: "due",
    action: null,
  },
  {
    id: 4,
    order: 365,
    customer: {
    name: "Jenny Wilson"
    },
    date: "11/7/2021",
    quantity: 13,
    amount: "$2587.86",
    status: "canceled",
    action: null,
  },
  {
    id: 5,
    order: 513,
    customer: {
    name: "Jenny Wilson"
    },
    date: "5/6/2022",
    quantity: 12,
    amount: "$3840.73",
    status: "paid",
    action: null,
  },
  {
    id: 6,
    order: 534,
    customer: {
    name: "Jenny Wilson"
    },
    date: "2/14/2022",
    quantity: 12,
    amount: "$4764.18",
    status: "canceled",
    action: null,
  },
  {
    id: 1,
    order: 951,
    customer: {
    name: "Jenny Wilson"
    },
    date: "3/26/2022",
    quantity: 13,
    amount: "$1779.53",
    status: "paid",
    action: null,
  },
  {
    id: 2,
    order: 238,
    customer: {
    name: "Jenny Wilson"
    },
    date: "2/6/2022",
    quantity: 13,
    amount: "$2215.78",
    status: "due",
    action: null,
  },
  {
    id: 3,
    order: 339,
    customer: {
    name: "Jenny Wilson"
    },
    date: "9/6/2021",
    quantity: 1,
    amount: "$3183.60",
    status: "due",
    action: null,
  },
  {
    id: 4,
    order: 365,
    customer: {
    name: "Jenny Wilson"
    },
    date: "11/7/2021",
    quantity: 13,
    amount: "$2587.86",
    status: "canceled",
    action: null,
  },
  {
    id: 5,
    order: 513,
    customer: {
    name: "Jenny Wilson"
    },
    date: "5/6/2022",
    quantity: 12,
    amount: "$3840.73",
    status: "paid",
    action: null,
  },
  {
    id: 6,
    order: 534,
    customer: {
    name: "Jenny Wilson"
    },
    date: "2/14/2022",
    quantity: 12,
    amount: "$4764.18",
    status: "canceled",
    action: null,
  },
  
  {
    id: 1,
    order: 951,
    customer: {
    name: "Jenny Wilson"
    },
    date: "3/26/2022",
    quantity: 13,
    amount: "$1779.53",
    status: "paid",
    action: null,
  },
  {
    id: 2,
    order: 238,
    customer: {
    name: "Jenny Wilson"
    },
    date: "2/6/2022",
    quantity: 13,
    amount: "$2215.78",
    status: "due",
    action: null,
  },
  {
    id: 3,
    order: 339,
    customer: {
    name: "Jenny Wilson"
    },
    date: "9/6/2021",
    quantity: 1,
    amount: "$3183.60",
    status: "due",
    action: null,
  },
  {
    id: 4,
    order: 365,
    customer: {
    name: "Jenny Wilson"
    },
    date: "11/7/2021",
    quantity: 13,
    amount: "$2587.86",
    status: "canceled",
    action: null,
  },
  {
    id: 5,
    order: 513,
    customer: {
    name: "Jenny Wilson"
    },
    date: "5/6/2022",
    quantity: 12,
    amount: "$3840.73",
    status: "paid",
    action: null,
  },
  {
    id: 6,
    order: 534,
    customer: {
    name: "Jenny Wilson"
    },
    date: "2/14/2022",
    quantity: 12,
    amount: "$4764.18",
    status: "canceled",
    action: null,
  },
  {
    id: 1,
    order: 951,
    customer: {
    name: "Jenny Wilson"
    },
    date: "3/26/2022",
    quantity: 13,
    amount: "$1779.53",
    status: "paid",
    action: null,
  },
  {
    id: 2,
    order: 238,
    customer: {
    name: "Jenny Wilson"
    },
    date: "2/6/2022",
    quantity: 13,
    amount: "$2215.78",
    status: "due",
    action: null,
  },
  {
    id: 3,
    order: 339,
    customer: {
    name: "Jenny Wilson"
    },
    date: "9/6/2021",
    quantity: 1,
    amount: "$3183.60",
    status: "due",
    action: null,
  },
  {
    id: 4,
    order: 365,
    customer: {
    name: "Jenny Wilson"
    },
    date: "11/7/2021",
    quantity: 13,
    amount: "$2587.86",
    status: "canceled",
    action: null,
  },
  {
    id: 5,
    order: 513,
    customer: {
    name: "Jenny Wilson"
    },
    date: "5/6/2022",
    quantity: 12,
    amount: "$3840.73",
    status: "paid",
    action: null,
  },
  {
    id: 6,
    order: 534,
    customer: {
    name: "Jenny Wilson"
    },
    date: "2/14/2022",
    quantity: 12,
    amount: "$4764.18",
    status: "canceled",
    action: null,
  },
  {
    id: 1,
    order: 951,
    customer: {
    name: "Jenny Wilson"
    },
    date: "3/26/2022",
    quantity: 13,
    amount: "$1779.53",
    status: "paid",
    action: null,
  },
  ];

const CustomTable: React.FC<CustomTableProps> = ({ data }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<TableRow | null>(null);
  const [newData, setNewData] = useState([]);
  const [activeTab, setActiveTab] = useState<
    "all" | "due" | "canceled" | "paid"
  >("all");

  const handleEditClick = (row: TableRow) => {
    setSelectedRow(row);
    setEditModalOpen(true);
  };

  const handleViewClick = (row: TableRow) => {
    setSelectedRow(row);
    setViewModalOpen(true);
  };

  const handleTabClick = (tab: "all" | "due" | "canceled" | "paid") => {
    setActiveTab(tab);
  };
  

  // const filteredData = data.filter((row) => {
  //   if (activeTab === 'all') {
  //     return true;
  //   }

  //   // Use toLowerCase() to make the comparison case-insensitive
  //   const rowStatus = row.status.toLowerCase();
  //   const activeTabLower = activeTab.toLowerCase();

  //   // Check if the row status contains the activeTab (partial match)
  //   return rowStatus.includes(activeTabLower);
  // });

  useEffect(() => {
    setNewData([])
    const filteredData = data1.filter((row) => row.status === activeTab)
    setNewData(filteredData)
  }, [activeTab]);

  console.log("newData",newData)

  return (
    <div>
      {/* Tabs */}
      <div className="tabs">
        <div
          className={activeTab === "all" ? "active" : ""}
          onClick={() => handleTabClick("all")}
        >
          All
        </div>
        <div
          className={activeTab === "due" ? "active" : ""}
          onClick={() => handleTabClick("due")}
        >
          Due
        </div>
        <div
          className={activeTab === "canceled" ? "active" : ""}
          onClick={() => handleTabClick("canceled")}
        >
          Canceled
        </div>
        <div
          className={activeTab === "paid" ? "active" : ""}
          onClick={() => handleTabClick("paid")}
        >
          Paid
        </div>
      </div>

      {/* Table Header */}
      <div className="table-header">
        <div>ID</div>
        <div>Order</div>
        <div>Customer</div>
        <div>Date</div>
        <div>Quantity</div>
        <div>Amount</div>
        <div>Status</div>
        <div>Action</div>
      </div>

      {/* Table Body */}
      <div className="table-body">
        {newData?.map((row) => (
          <div key={row.id} className="table-row">
            <div>{row.id}</div>
            <div>{row.order}</div>
            <div>{row.customer.name}</div>
            <div>{row.date}</div>
            <div>{row.quantity}</div>
            <div>{row.amount}</div>
            <div>{row.status}</div>
            <div>
              <button onClick={() => handleEditClick(row)}>Edit</button>
              <button onClick={() => handleViewClick(row)}>View</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {editModalOpen && (
        <EditRowModal
          row={selectedRow}
          onClose={() => setEditModalOpen(false)}
        />
      )}
      {viewModalOpen && (
        <ViewRowModal
          row={selectedRow}
          onClose={() => setViewModalOpen(false)}
        />
      )}

      <style jsx>{`
        .tabs {
          display: flex;
          margin-bottom: 10px;
        }

        .tabs div {
          cursor: pointer;
          padding: 8px;
          margin-right: 10px;
          background-color: #eee;
          border: none;
          outline: none;
        }

        .tabs div.active {
          background-color: #ddd;
        }

        .table-header {
          display: flex;
          justify-content: space-between;
          font-weight: bold;
        }

        .table-row {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #ccc;
          padding: 8px 0;
        }
      `}</style>
    </div>
  );
};

export default CustomTable;
