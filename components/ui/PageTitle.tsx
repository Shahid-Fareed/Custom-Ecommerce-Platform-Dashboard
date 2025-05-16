// DynamicTitle.tsx

import React, { ReactNode } from "react";
import Button from "./Button";

interface PageTitleProps {
  title: string;
  buttontext: string;
  icon: ReactNode; // ReactNode allows any valid React children, including JSX elements
}

const PageTitle: React.FC<PageTitleProps> = ({ title, buttontext, icon }) => {
  return (
    <h2 className="w-full text-[16px] font-medium col-span-2 flex justify-between items-center">
      {title}
      <Button
        text={buttontext}
        icon={icon}
        isLoading={undefined}
        disabled={undefined}
        children={undefined}
        link={undefined}
        onClick={undefined}
        div={undefined}
        className="btn-sm"
      />
      {/* <button className="mr-5 flex items-center">
        {icon} 
        {buttontext}
      </button> */}
    </h2>
  );
};

export default PageTitle;
