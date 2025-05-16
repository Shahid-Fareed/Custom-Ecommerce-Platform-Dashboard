"use client";
import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import { IoChevronForward, IoChevronBackOutline } from "react-icons/io5";

import { useLayoutEffect, useRef, useState } from "react";
import Card from "@/components/ui/Card";
import AreaSpaLine from "@/components/AreaSpaLine";
import Pie from "@/components/Pie";
import HorizontalBar from "@/components/HorizontalBar";
import CustomTable from "@/components/CustomTable";
import Tooltip from "@/components/ui/Tooltip";
import { Icon } from "@iconify/react";
import Table from "@/components/Table";
import CustomTable2 from "@/components/CustomTable2";
interface data {
  id: number;
  order: number;
  customer: customer;
  date: string;
  quantity: number;
  amount: string;
  status: string;
  action: null | any; // Update this based on the actual action type
}

const headers = ["id", "order", "status", "name", "amount", "date"];
const data2 = [
  {
    id: 1,
    order: 423,
    name: "Jenny Wilson",
    date: "3/2/2022",
    quantity: 8,
    amount: "$2700.12",
    status: "success",
    action: null,
  },
  {
    id: 2,
    order: 703,

    name: "Jenny Wilson",

    date: "12/8/2021",
    quantity: 8,
    amount: "$4508.13",
    status: "canceled",
    action: null,
  },
  {
    id: 3,
    order: 792,

    name: "Jenny Wilson",

    date: "11/22/2021",
    quantity: 11,
    amount: "$4938.04",
    status: "due",
    action: null,
  },
  {
    id: 4,
    order: 238,

    name: "Jenny Wilson",

    date: "2/6/2022",
    quantity: 13,
    amount: "$2215.78",
    status: "pending",
    action: null,
  },
  {
    id: 5,
    order: 423,

    name: "Jenny Wilson",

    date: "3/2/2022",
    quantity: 8,
    amount: "$2700.12",
    status: "success",
    action: null,
  },
  {
    id: 6,
    order: 703,

    name: "Jenny Wilson",

    date: "12/8/2021",
    quantity: 8,
    amount: "$4508.13",
    status: "canceled",
    action: null,
  },
  {
    id: 7,
    order: 792,

    name: "Jenny Wilson",

    date: "11/22/2021",
    quantity: 11,
    amount: "$4938.04",
    status: "due",
    action: null,
  },
  {
    id: 8,
    order: 238,

    name: "Jenny Wilson",

    date: "2/6/2022",
    quantity: 13,
    amount: "$2215.78",
    status: "pending",
    action: null,
  },
  {
    id: 9,
    order: 423,

    name: "Jenny Wilson",

    date: "3/2/2022",
    quantity: 8,
    amount: "$2700.12",
    status: "success",
    action: null,
  },
  {
    id: 10,
    order: 703,

    name: "Jenny Wilson",

    date: "12/8/2021",
    quantity: 8,
    amount: "$4508.13",
    status: "canceled",
    action: null,
  },
  {
    id: 11,
    order: 792,

    name: "Jenny Wilson",

    date: "11/22/2021",
    quantity: 11,
    amount: "$4938.04",
    status: "due",
    action: null,
  },
  {
    id: 12,
    order: 238,

    name: "Jenny Wilson",

    date: "2/6/2022",
    quantity: 13,
    amount: "$2215.78",
    status: "pending",
    action: null,
  },
  {
    id: 13,
    order: 423,

    name: "Jenny Wilson",

    date: "3/2/2022",
    quantity: 8,
    amount: "$2700.12",
    status: "success",
    action: null,
  },
  {
    id: 14,
    order: 703,

    name: "Jenny Wilson",

    date: "12/8/2021",
    quantity: 8,
    amount: "$4508.13",
    status: "canceled",
    action: null,
  },
  {
    id: 15,
    order: 792,

    name: "Jenny Wilson",

    date: "11/22/2021",
    quantity: 11,
    amount: "$4938.04",
    status: "due",
    action: null,
  },
  {
    id: 16,
    order: 238,

    name: "Jenny Wilson",

    date: "2/6/2022",
    quantity: 13,
    amount: "$2215.78",
    status: "pending",
    action: null,
  },
  {
    id: 17,
    order: 423,

    name: "Jenny Wilson",

    date: "3/2/2022",
    quantity: 8,
    amount: "$2700.12",
    status: "success",
    action: null,
  },
  {
    id: 18,
    order: 703,

    name: "Jenny Wilson",

    date: "12/8/2021",
    quantity: 8,
    amount: "$4508.13",
    status: "canceled",
    action: null,
  },
  {
    id: 19,
    order: 792,

    name: "Jenny Wilson",

    date: "11/22/2021",
    quantity: 11,
    amount: "$4938.04",
    status: "due",
    action: null,
  },
  {
    id: 20,
    order: 238,

    name: "Jenny Wilson",

    date: "2/6/2022",
    quantity: 13,
    amount: "$2215.78",
    status: "pending",
    action: null,
  },
  {
    id: 21,
    order: 238,

    name: "Jenny Wilson",

    date: "2/6/2022",
    quantity: 13,
    amount: "$2215.78",
    status: "pending",
    action: null,
  },
  {
    id: 22,
    order: 238,

    name: "Jenny Wilson",

    date: "2/6/2022",
    quantity: 13,
    amount: "$2215.78",
    status: "pending",
    action: null,
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

  return (
    <>
      <div className="grid grid-cols-4 col-span-2 gap-5">
        <div className="col-span-1 border border-[#EFF2F4] hover:border-[#4E8CF7] p-5">
          <p>Total Revenue</p>
          <span className="text-lg font-bold w-full">AED 3,676.25</span>
        </div>
        <div className="col-span-1 border border-[#EFF2F4] hover:border-[#4E8CF7] p-5">
          <p>Total Revenue</p>
          <span className="text-lg font-bold w-full">AED 3,676.25</span>
        </div>
        <div className="col-span-1 border border-[#EFF2F4] hover:border-[#4E8CF7] p-5">
          <p>Total Revenue</p>
          <span className="text-lg font-bold w-full">AED 3,676.25</span>
        </div>
        <div className="col-span-1 border border-[#EFF2F4] hover:border-[#4E8CF7] p-5">
          <p>Total Revenue</p>
          <span className="text-lg font-bold w-full">AED 3,676.25</span>
        </div>
      </div>
      <Card title="Area Chart" className="col-span-2 p-0">
        <AreaSpaLine />
      </Card>
      <div className="col-span-2 grid grid-cols-2">
        <div className="col-span-1">
          <Card title="Pie & Donut Chart">
            <Pie />
          </Card>
        </div>
        <Card title="Horizontal Bar">
          <HorizontalBar />
        </Card>
      </div>
      <div className="col-span-2">
        {/* <CustomTable columns={columns} data={data1} title="Page 1 Table"/> */}
        <CustomTable2 tableData={data2} headers={headers} />
        {/* <Table data={data1} title="Page 1 Table" /> */}
      </div>
    </>
  );
}
