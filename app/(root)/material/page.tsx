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
        Header: "Image",
        accessor: "image",
        Cell: (row) => {
          const imageName = row?.cell?.value;
          const imageUrl = imageName ? `http://localhost:4001/material_image/${imageName}` : null;
    
          return (
            <span>
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Preview"
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
              )}
            </span>
          );
        },
      },

    {
      Header: "Material Name",
      accessor: "name",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },

    {
        Header: "Category",
        accessor: "category_name",
        Cell: (row) => {
          return <span>{row?.cell?.value}</span>;
        },
    },


    // {
    //     Header: "Status",
    //     accessor: "status",
    //     Cell: (row) => {
    //       const statusValue = row?.cell?.value;
    
    //       return (
    //         <span className="block w-full">
    //           <span
    //             className={`inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
    //               statusValue === 1 ? "text-success-500 bg-success-500" : ""
    //             } 
    //             ${statusValue === 0 ? "text-danger-500 bg-danger-500" : ""}
    //             `}
    //           >
    //             {statusValue === 1 ? "Published" : statusValue === 0 ? "Draft" : ""}
    //           </span>
    //         </span>
    //       );
    //     },
    //   },
   
        
    {
      Header: "action",
      accessor: "action",
      Cell: (row) => {

        const handleDelete = async () => {
          try {
            await axios.get(`http://localhost:4001/api/v1/material/delete/${row.row.original.id}`);
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
               <Link href={`/material/edit/${row.row.original.id}`} className="action-btn">
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
        const response = await axios.get('http://localhost:4001/api/v1/material');
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
              Add Material
            </h2>
            <div className="col-span-2">
                <div className="col-span-2">
                    <CustomTable  columns={columns} data={data} title="Materials" />
                </div>
            </div>
         
    </>
  )
}

export default page