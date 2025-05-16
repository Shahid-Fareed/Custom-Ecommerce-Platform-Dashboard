"use client"
import CustomTable from '@/components/CustomTable'
import Tooltip from "@/components/ui/Tooltip";
import Icon from "@/components/ui/Icon";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from "next/link";

const columns = [
    {
      Header: "Id",
      accessor: "id",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },

    {
      Header: "Name",
      accessor: "name",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },

    {
        Header: "Status",
        accessor: "status",
        Cell: (row) => {
          const statusValue = row?.cell?.value;
    
          return (
            <span className="block w-full">
              <span
                className={`inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
                  statusValue === 1 ? "text-success-500 bg-success-500" : ""
                } 
                ${statusValue === 0 ? "text-danger-500 bg-danger-500" : ""}
                `}
              >
                {statusValue === 1 ? "Published" : statusValue === 0 ? "Draft" : ""}
              </span>
            </span>
          );
        },
      },
   
        
    {
      Header: "action",
      accessor: "action",
      Cell: (row) => {

        const handleDelete = async () => {
          try {
            await axios.get(`http://localhost:4001/api/v1/font/delete/${row.row.original.id}`);
             // Update the table data by removing the deleted item
             setData(prevData => prevData.filter(item => item.id !== row.row.original.id));
          } catch (error) {
            console.error('Error deleting item:', error);
          }
        };
        return (
          <div className="flex space-x-3 rtl:space-x-reverse">
            <Tooltip content="View" placement="top" arrow animation="shift-away">
              <button className="action-btn" type="button">
                <Icon icon="heroicons:eye" />
              </button>
            </Tooltip>
            <Tooltip content="Edit" placement="top" arrow animation="shift-away">
               <Link href={`/fonts/edit/${row.row.original.id}`} className="action-btn">
                  <Icon icon="heroicons:pencil-square" />
                </Link>
            </Tooltip>
            <Tooltip
              content="Delete"
              placement="top"
              arrow
              animation="shift-away"
              theme="danger"
            >
              <button className="action-btn" type="button" onClick={handleDelete}>
                <Icon icon="heroicons:trash" />
              </button>
            </Tooltip>
          </div>
        );
      },
    },
  ];


function page() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'API_ENDPOINT' with the actual API endpoint you want to fetch data from
        const response = await axios.get('http://localhost:4001/api/v1/font');
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
          <div className="col-span-2">
              <CustomTable  columns={columns} data={data} title="Fonts" />
          </div>
      </div>
    </>
  )
}

export default page