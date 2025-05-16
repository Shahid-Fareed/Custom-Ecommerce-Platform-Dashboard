"use client";
import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import { IoChevronForward, IoChevronBackOutline } from "react-icons/io5";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import AreaSpaLine from "@/components/AreaSpaLine";
import Pie from "@/components/Pie";
import HorizontalBar from "@/components/HorizontalBar";
import CustomTable from "@/components/CustomTable";
import Tooltip from "@/components/ui/Tooltip";
import { Icon } from "@iconify/react";
import Table from "@/components/Table";
import CustomTable2 from "@/components/CustomTable2";
import axios from 'axios';
interface data {
  id: number;
  order: number;
  customer: Customer;
  date: string;
  quantity: number;
  amount: string;
  status: string;
  action: null | any; // Update this based on the actual action type
}
const columns = [
  {
    Header: "Id",
    accessor: "id",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Order",
    accessor: "order_number",
    Cell: (row) => {
      return <span>#{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Customer",
    accessor: "customer",
    Cell: (row) => {
      return (
        <div>
          <span className="inline-flex items-center">
            <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
              {row?.cell?.value.customer}
            </span>
          </span>
        </div>
      );
    },
  },
  {
    Header: "date",
    accessor: "date",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "quantity",
    accessor: "quantity",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "amount",
    accessor: "amount",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "status",
    accessor: "status",
    Cell: (row) => {
      return (
        <span className="block w-full">
          <span
            className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
              row?.cell?.value === "paid"
                ? "text-success-500 bg-success-500"
                : ""
            } 
            ${
              row?.cell?.value === "due"
                ? "text-warning-500 bg-warning-500"
                : ""
            }
            ${
              row?.cell?.value === "canceled"
                ? "text-danger-500 bg-danger-500"
                : ""
            }
            
             `}
          >
            {row?.cell?.value}
          </span>
        </span>
      );
    },
  },
  {
    Header: "action",
    accessor: "action",
    Cell: (row) => {
      return (
        <div className="flex space-x-3 rtl:space-x-reverse">
          <Tooltip content="View" placement="top" arrow animation="shift-away">
            <button className="action-btn" type="button">
              <Icon icon="heroicons:eye" />
            </button>
          </Tooltip>
          <Tooltip content="Edit" placement="top" arrow animation="shift-away">
            <button className="action-btn" type="button">
              <Icon icon="heroicons:pencil-square" />
            </button>
          </Tooltip>
          <Tooltip
            content="Delete"
            placement="top"
            arrow
            animation="shift-away"
            theme="danger"
          >
            <button className="action-btn" type="button">
              <Icon icon="heroicons:trash" />
            </button>
          </Tooltip>
        </div>
      );
    },
  },
];


function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {

  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState([]);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'API_ENDPOINT' with the actual API endpoint you want to fetch data from
        const response = await axios.get('http://localhost:4001/api/v1/order');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="col-span-2">
        
        <CustomTable2   />
       
      </div>
    </>
  );
}
