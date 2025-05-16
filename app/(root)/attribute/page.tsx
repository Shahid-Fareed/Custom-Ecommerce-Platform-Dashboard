"use client";
import CustomTable from "@/components/CustomTable";
import Tooltip from "@/components/ui/Tooltip";
import Icon from "@/components/ui/Icon";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomTable2 from "@/components/CustomTable2";
import Link from "next/link";

function page() {
  const headers = ["id", "name", "type"];

  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:4001/api/v1/attribute"
  //       );
  //       setData(response.data);
  //       console.log("Response", response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.18.140:4001/api/v1/attribute"
        );
        setData(response.data);
        console.log("Response", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log("Data", data);

  return (
    <>
      <h2 className="w-full p-3 bg-[#F9FAFB] text-[16px] font-medium col-span-2 flex items-center">
        <button className="mr-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
          >
            <path
              d="M10.656 1.34399L2.688 9.31199L10.656 17.28L9.312 18.624L0 9.31199L9.312 -7.62939e-06L10.656 1.34399Z"
              fill="#272727"
            />
            <path
              d="M1.34375 10.2724L1.34375 8.35243L17.6637 8.35243V10.2724L1.34375 10.2724Z"
              fill="#272727"
            />
          </svg>
        </button>
        Add Attribute
      </h2>
      <div className="col-span-2">
        <div className="col-span-2">
          <CustomTable2 tableData={data} headers={headers} />
        </div>
      </div>
    </>
  );
}

export default page;
