import React from "react";
import { IconType } from "react-icons";

interface IconsProps {
  icon: IconType;
  className?: string;
  size?: string;
  rotate?: number;
  flip?: string;
}

const Icons: React.FC<IconsProps> = ({
  icon,
  className,
  size,
  rotate,
  flip,
}) => {
  return (
    <>
      {React.createElement(icon, {
        size,
        rotate,
        flip,
        className,
      })}
    </>
  );
};

export default Icons;
