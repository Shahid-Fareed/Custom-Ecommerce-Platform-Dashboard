"use client";
import React from "react";
import AreaSpaLine from "@/components/AreaSpaLine";
import BasicArea from "@/components/BasicArea";
import Loading from "@/components/Loading";
import Donut from "@/components/Donut";
import GlobalFilter from "@/components/GlobalFilter";
import HorizontalBar from "@/components/HorizontalBar";
import Menu from "@/components/Menu";
import Pie from "@/components/Pie";
import PieChart from "@/components/Piechart";
import CustomTable from "@/components/CustomTable";
import Alert from "@/components/ui/Alert";
// import Tooltip from '@/components/ui/Tooltip'
import { Icon } from "@iconify/react";
import Textinput from "@/components/ui/Textinput";
// import UploadFile from '@/components/UploadFile'
import Textarea from "@/components/ui/Textarea";
import Card from "@/components/ui/Card";
import CustomTable2 from "@/components/CustomTable21";
import { Tooltip } from "chart.js";
// import Table from '@/components/Table'

// const columns = [
//   {
//     Header: "Id",
//     accessor: "id",
//     Cell: (row) => {
//       return <span>{row?.cell?.value}</span>;
//     },
//   },
//   {
//     Header: "Order",
//     accessor: "order",
//     Cell: (row) => {
//       return <span>#{row?.cell?.value}</span>;
//     },
//   },
//   {
//     Header: "customer",
//     accessor: "customer",
//     Cell: (row) => {
//       return (
//         <div>
//           <span className="inline-flex items-center">
//             {/* <span className="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none bg-slate-600">
//               <img
//                 src={row?.cell?.value.image}
//                 alt=""
//                 className="object-cover w-full h-full rounded-full"
//               />
//             </span> */}
//             <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
//               {row?.cell?.value.name}
//             </span>
//           </span>
//         </div>
//       );
//     },
//   },
//   {
//     Header: "date",
//     accessor: "date",
//     Cell: (row) => {
//       return <span>{row?.cell?.value}</span>;
//     },
//   },
//   {
//     Header: "quantity",
//     accessor: "quantity",
//     Cell: (row) => {
//       return <span>{row?.cell?.value}</span>;
//     },
//   },
//   {
//     Header: "amount",
//     accessor: "amount",
//     Cell: (row) => {
//       return <span>{row?.cell?.value}</span>;
//     },
//   },
//   {
//     Header: "status",
//     accessor: "status",
//     Cell: (row) => {
//       return (
//         <span className="block w-full">
//           <span
//             className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
//               row?.cell?.value === "paid"
//                 ? "text-success-500 bg-success-500"
//                 : ""
//             }
//             ${
//               row?.cell?.value === "due"
//                 ? "text-warning-500 bg-warning-500"
//                 : ""
//             }
//             ${
//               row?.cell?.value === "cancled"
//                 ? "text-danger-500 bg-danger-500"
//                 : ""
//             }

//              `}
//           >
//             {row?.cell?.value}
//           </span>
//         </span>
//       );
//     },
//   },
//   {
//     Header: "action",
//     accessor: "action",
//     Cell: (row) => {
//       return (
//         <div className="flex space-x-3 rtl:space-x-reverse">
//           <Tooltip content="View" placement="top" arrow animation="shift-away">
//             <button className="action-btn" type="button">
//               <Icon icon="heroicons:eye" />
//             </button>
//           </Tooltip>
//           <Tooltip content="Edit" placement="top" arrow animation="shift-away">
//             <button className="action-btn" type="button">
//               <Icon icon="heroicons:pencil-square" />
//             </button>
//           </Tooltip>
//           <Tooltip
//             content="Delete"
//             placement="top"
//             arrow
//             animation="shift-away"
//             theme="danger"
//           >
//             <button className="action-btn" type="button">
//               <Icon icon="heroicons:trash" />
//             </button>
//           </Tooltip>
//         </div>
//       );
//     },
//   },
// ];
// const data = [
//   {
//     id: 40,
//     order: 423,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "3/2/2022",
//     quantity: 8,
//     amount: "$2700.12",
//     status: "cancled",
//     action: null,
//   },
//   {
//     id: 41,
//     order: 703,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "12/8/2021",
//     quantity: 8,
//     amount: "$4508.13",
//     status: "cancled",
//     action: null,
//   },
//   {
//     id: 42,
//     order: 792,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "11/22/2021",
//     quantity: 11,
//     amount: "$4938.04",
//     status: "due",
//     action: null,
//   },
//   {
//     id: 2,
//     order: 238,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "2/6/2022",
//     quantity: 13,
//     amount: "$2215.78",
//     status: "due",
//     action: null,
//   },
//   {
//     id: 3,
//     order: 339,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "9/6/2021",
//     quantity: 1,
//     amount: "$3183.60",
//     status: "due",
//     action: null,
//   },
//   {
//     id: 4,
//     order: 365,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "11/7/2021",
//     quantity: 13,
//     amount: "$2587.86",
//     status: "cancled",
//     action: null,
//   },
//   {
//     id: 5,
//     order: 513,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "5/6/2022",
//     quantity: 12,
//     amount: "$3840.73",
//     status: "paid",
//     action: null,
//   },
//   {
//     id: 6,
//     order: 534,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "2/14/2022",
//     quantity: 12,
//     amount: "$4764.18",
//     status: "cancled",
//     action: null,
//   },
//   {
//     id: 1,
//     order: 951,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "3/26/2022",
//     quantity: 13,
//     amount: "$1779.53",
//     status: "paid",
//     action: null,
//   },
//   {
//     id: 2,
//     order: 238,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "2/6/2022",
//     quantity: 13,
//     amount: "$2215.78",
//     status: "due",
//     action: null,
//   },
//   {
//     id: 3,
//     order: 339,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "9/6/2021",
//     quantity: 1,
//     amount: "$3183.60",
//     status: "due",
//     action: null,
//   },
//   {
//     id: 4,
//     order: 365,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "11/7/2021",
//     quantity: 13,
//     amount: "$2587.86",
//     status: "cancled",
//     action: null,
//   },
//   {
//     id: 5,
//     order: 513,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "5/6/2022",
//     quantity: 12,
//     amount: "$3840.73",
//     status: "paid",
//     action: null,
//   },
//   {
//     id: 6,
//     order: 534,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "2/14/2022",
//     quantity: 12,
//     amount: "$4764.18",
//     status: "cancled",
//     action: null,
//   },
//   {
//     id: 1,
//     order: 951,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "3/26/2022",
//     quantity: 13,
//     amount: "$1779.53",
//     status: "paid",
//     action: null,
//   },
//   {
//     id: 2,
//     order: 238,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "2/6/2022",
//     quantity: 13,
//     amount: "$2215.78",
//     status: "due",
//     action: null,
//   },
//   {
//     id: 3,
//     order: 339,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "9/6/2021",
//     quantity: 1,
//     amount: "$3183.60",
//     status: "due",
//     action: null,
//   },
//   {
//     id: 4,
//     order: 365,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "11/7/2021",
//     quantity: 13,
//     amount: "$2587.86",
//     status: "cancled",
//     action: null,
//   },
//   {
//     id: 5,
//     order: 513,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "5/6/2022",
//     quantity: 12,
//     amount: "$3840.73",
//     status: "paid",
//     action: null,
//   },
//   {
//     id: 6,
//     order: 534,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "2/14/2022",
//     quantity: 12,
//     amount: "$4764.18",
//     status: "cancled",
//     action: null,
//   },
//   {
//     id: 1,
//     order: 951,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "3/26/2022",
//     quantity: 13,
//     amount: "$1779.53",
//     status: "paid",
//     action: null,
//   },
//   {
//     id: 2,
//     order: 238,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "2/6/2022",
//     quantity: 13,
//     amount: "$2215.78",
//     status: "due",
//     action: null,
//   },
//   {
//     id: 3,
//     order: 339,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "9/6/2021",
//     quantity: 1,
//     amount: "$3183.60",
//     status: "due",
//     action: null,
//   },
//   {
//     id: 4,
//     order: 365,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "11/7/2021",
//     quantity: 13,
//     amount: "$2587.86",
//     status: "cancled",
//     action: null,
//   },
//   {
//     id: 5,
//     order: 513,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "5/6/2022",
//     quantity: 12,
//     amount: "$3840.73",
//     status: "paid",
//     action: null,
//   },
//   {
//     id: 6,
//     order: 534,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "2/14/2022",
//     quantity: 12,
//     amount: "$4764.18",
//     status: "cancled",
//     action: null,
//   },

//   {
//     id: 1,
//     order: 951,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "3/26/2022",
//     quantity: 13,
//     amount: "$1779.53",
//     status: "paid",
//     action: null,
//   },
//   {
//     id: 2,
//     order: 238,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "2/6/2022",
//     quantity: 13,
//     amount: "$2215.78",
//     status: "due",
//     action: null,
//   },
//   {
//     id: 3,
//     order: 339,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "9/6/2021",
//     quantity: 1,
//     amount: "$3183.60",
//     status: "due",
//     action: null,
//   },
//   {
//     id: 4,
//     order: 365,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "11/7/2021",
//     quantity: 13,
//     amount: "$2587.86",
//     status: "cancled",
//     action: null,
//   },
//   {
//     id: 5,
//     order: 513,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "5/6/2022",
//     quantity: 12,
//     amount: "$3840.73",
//     status: "paid",
//     action: null,
//   },
//   {
//     id: 6,
//     order: 534,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "2/14/2022",
//     quantity: 12,
//     amount: "$4764.18",
//     status: "cancled",
//     action: null,
//   },
//   {
//     id: 1,
//     order: 951,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "3/26/2022",
//     quantity: 13,
//     amount: "$1779.53",
//     status: "paid",
//     action: null,
//   },
//   {
//     id: 2,
//     order: 238,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "2/6/2022",
//     quantity: 13,
//     amount: "$2215.78",
//     status: "due",
//     action: null,
//   },
//   {
//     id: 3,
//     order: 339,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "9/6/2021",
//     quantity: 1,
//     amount: "$3183.60",
//     status: "due",
//     action: null,
//   },
//   {
//     id: 4,
//     order: 365,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "11/7/2021",
//     quantity: 13,
//     amount: "$2587.86",
//     status: "cancled",
//     action: null,
//   },
//   {
//     id: 5,
//     order: 513,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "5/6/2022",
//     quantity: 12,
//     amount: "$3840.73",
//     status: "paid",
//     action: null,
//   },
//   {
//     id: 6,
//     order: 534,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "2/14/2022",
//     quantity: 12,
//     amount: "$4764.18",
//     status: "cancled",
//     action: null,
//   },
//   {
//     id: 1,
//     order: 951,
//     customer: {
//       name: "Jenny Wilson",
//     },
//     date: "3/26/2022",
//     quantity: 13,
//     amount: "$1779.53",
//     status: "paid",
//     action: null,
//   },
// ];

const Components: React.FC = () => {
  return (
    <div className="col-span-2">
      <Loading />
      <div className="p-5 grid grid-cols-2">
        <h1 className="col-span-2">Hello</h1>
        <div title="Dismissible Light Color Alerts With Icon ">
          <div className=" light-mode space-y-4">
            <Alert
              dismissible
              icon="fluent:target-20-regular"
              className=" alert-dark light-mode"
            >
              This is an alert—check it out!
            </Alert>
            <Alert
              dismissible
              icon="fluent:target-20-regular"
              className=" light-mode alert-primary"
            >
              This is an alert—check it out!
            </Alert>
            <Alert
              dismissible
              icon="heroicons-outline:support"
              className=" light-mode alert-secondary"
            >
              This is an alert—check it out!
            </Alert>
            <Alert
              dismissible
              icon="akar-icons:double-check"
              className=" light-mode alert-success"
            >
              This is an alert—check it out!
            </Alert>
            <Alert
              dismissible
              icon="heroicons-outline:exclamation"
              className=" light-mode alert-danger"
            >
              This is an alert—check it out!
            </Alert>
            <Alert
              dismissible
              icon="heroicons-outline:ban"
              className=" light-mode alert-warning"
            >
              This is an alert—check it out!
            </Alert>
            <Alert
              dismissible
              icon="heroicons-outline:information-circle"
              className=" light-mode alert-info"
            >
              This is an alert—check it out!
            </Alert>
            <Alert
              dismissible
              icon="heroicons-outline:exclamation"
              className=" light-mode alert-light"
            >
              This is an alert—check it out!
            </Alert>
          </div>
        </div>
        <div title="Outline Theme Color Alerts">
          <div className=" space-y-4">
            <Alert
              label="This is an alert—check it out!"
              className="alert-outline-primary"
            />
            <Alert
              label="This is an alert—check it out!"
              className="alert-outline-secondary"
            />
            <Alert
              label="This is an alert—check it out!"
              className="alert-outline-success"
            />
            <Alert
              label="This is an alert—check it out!"
              className="alert-outline-danger"
            />
            <Alert
              label="This is an alert—check it out!"
              className="alert-outline-warning"
            />
            <Alert
              label="This is an alert—check it out!"
              className="alert-outline-info"
            />
            <Alert
              label="This is an alert—check it out!"
              className="alert-outline-light"
            />
            <Alert
              label="This is an alert—check it out!"
              className="alert-outline-dark"
            />
          </div>
        </div>
        {/* <div title="Outline Light Color Alerts With Icon ">
          <div className="space-y-4">
            <Alert
              dismissible
              icon="fluent:target-20-regular"
              className="alert-outline-dark"
            >
              This is an alert—check it out!
            </Alert>
            <Alert
              dismissible
              icon="fluent:target-20-regular"
              className="alert-outline-primary"
            >
              This is an alert—check it out!
            </Alert>
            <Alert
              dismissible
              icon="heroicons-outline:support"
              className="alert-outline-secondary"
            >
              This is an alert—check it out!
            </Alert>
            <Alert
              dismissible
              icon="akar-icons:double-check"
              className="alert-outline-success"
            >
              This is an alert—check it out!
            </Alert>
            <Alert
              dismissible
              icon="heroicons-outline:exclamation"
              className="alert-outline-danger"
            >
              This is an alert—check it out!
            </Alert>
            <Alert
              dismissible
              icon="heroicons-outline:ban"
              className="alert-outline-warning"
            >
              This is an alert—check it out!
            </Alert>
            <Alert
              dismissible
              icon="heroicons-outline:information-circle"
              className="alert-outline-info"
            >
              This is an alert—check it out!
            </Alert>
            <Alert
              dismissible
              icon="heroicons-outline:exclamation"
              className="alert-outline-light"
            >
              This is an alert—check it out!
            </Alert>
          </div>
        </div> */}
      </div>
      <div className="p-5">
        <Textinput
          label="Project Name*"
          id="pn"
          type="text"
          placeholder="Management dashboard "
        />
        <Textinput
          label="Readonly Input"
          id="pn2"
          readonly
          type="text"
          placeholder="You can't update me :P"
        />
        <Textarea
          label="Project description"
          id="pn4"
          placeholder="Type here"
        />
      </div>
      <AreaSpaLine />
      <BasicArea />
      <Donut />
      <GlobalFilter filter={undefined} setFilter={undefined} />
      <HorizontalBar />
      {/* <Menu /> */}
      <Pie />
      <PieChart chartId={""} />
      {/* <CustomTable  data={data} title="Page 1 Table" /> */}
      {/* <Table /> */}
    </div>
  );
};

export default Components;
