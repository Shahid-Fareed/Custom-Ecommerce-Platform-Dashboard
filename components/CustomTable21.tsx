import React from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";

const CustomTable2 = ({ tableData }) => {
  if (!tableData || tableData.length === 0) {
    return <p>No tableData available.</p>;
  }

  // Extract headers from the first item, including nested keys
  const extractHeaders = (item, parentKey = "") => {
    const headers = [];
    for (const key in item) {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof item[key] === "object" && item[key] !== null) {
        // Handle nested objects
        const nestedHeaders = extractHeaders(item[key], fullKey);
        headers.push(...nestedHeaders);
      } else {
        headers.push(fullKey);
      }
    }
    return headers;
  };

  // Get headers for the table
  const headers = extractHeaders(tableData[0]);

  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr className="bg-slate-50 text-[#2a2a2a] px-3 py-1 text-xs tracking-wider">
          {headers.map((header, index) => (
            <th key={index}>{header.split(".").pop()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, rowIndex) => (
          <>
            <tr
              key={rowIndex}
              className="w-full px-2 py-1 border-b border-b-gray-100 text-sm"
            >
              {headers.map((header, colIndex) => (
                <td key={colIndex}>{getValueByHeader(row, header)}</td>
              ))}
              <td>
                <button className="text-red-500 hover:underline ml-2">
                  <MdOutlineDeleteOutline />
                </button>
              </td>
            </tr>
          </>
        ))}
      </tbody>
    </table>
  );
};

// Helper function to get nested values by header path
const getValueByHeader = (item, header) => {
  const keys = header.split(".");
  let value = item;

  for (const key of keys) {
    value = value[key];
    if (value === undefined || value === null) {
      return ""; // Return an empty string for undefined or null values
    }
  }

  return value;
};

export default CustomTable2;
