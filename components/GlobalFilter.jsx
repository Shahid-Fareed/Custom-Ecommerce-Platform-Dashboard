import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  const onChange = (e) => {
    setValue(e.target.value);
    setFilter(e.target.value || undefined);
  };
  return (
      <Textinput
        value={value || ""}
        onChange={onChange}
        placeholder="Search anything..."
        className="w-[100%] bg-white p-2 border border-gray-100"
      />
  );
};

export default GlobalFilter;
