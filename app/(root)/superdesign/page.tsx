"use client"

import CustomTable from '@/components/CustomTable'
import Tooltip from "@/components/ui/Tooltip";
import Icon from "@/components/ui/Icon";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const columns = [
    {
      Header: "Id",
      accessor: "id",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    
    {
      Header: "Team Name",
      accessor: "team_name",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
   
    {
      Header: "Sports",
      accessor: "sports",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },

    {
      Header: "Quantity",
      accessor: "quantity",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },


    {
        Header: "Customer Name",
        accessor: "customer_name",
        Cell: (row) => {
            return <span>{row?.cell?.value}</span>;
        },
    },

    {
        Header: "Customer Email",
        accessor: "customer_email",
        Cell: (row) => {
            return <span>{row?.cell?.value}</span>;
        },
    },
        
    {
      Header: "action",
      accessor: "action",
      Cell: (row) => {

        const handleDelete = async () => {
          try {
            await axios.get(`http://localhost:4001/api/v1/superdesign/delete/${row.row.original.id}`);
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
        const response = await axios.get('http://localhost:4001/api/v1/superdesign');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      
            <h2 className="w-full p-3 bg-[#F9FAFB] text-[16px] font-medium col-span-2 flex items-center">
              <button className="mr-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                  <path d="M10.656 1.34399L2.688 9.31199L10.656 17.28L9.312 18.624L0 9.31199L9.312 -7.62939e-06L10.656 1.34399Z" fill="#272727"/>
                  <path d="M1.34375 10.2724L1.34375 8.35243L17.6637 8.35243V10.2724L1.34375 10.2724Z" fill="#272727"/>
                </svg>
              </button>
              Super Design
            </h2>
            <div className="col-span-2">
                <div className="col-span-2">
                    <CustomTable  columns={columns} data={data} title="Super Design" />
                </div>
            </div>
         
    </>
  )
}

export default page