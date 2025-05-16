// components/Checkbox.tsx

import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface CheckboxProps {
  name: string;
  placeholder: string;
  getCheckBoxValue: (value: number) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ name, placeholder, getCheckBoxValue }: CheckboxProps) => {
  const uniqueId = uuidv4();
  const [checked, setChecked] = useState(false);
  const [checkedValue, setCheckedValue] = useState(0);

  useEffect(() => {
    getCheckBoxValue(checkedValue);
  }, [checkedValue]);

  return (
    <>
      {name && (
        <div
          className="group form-group form-group-checkbox block relative ltr:pl-6 rtl:pr-6 cursor-pointer"
          onClick={() => {
            setChecked(!checked);
            setCheckedValue(checkedValue === 0 ? 1 : 0);
          }}
        >
          {/* Label */}
          {placeholder}

          {/* Checkbox */}
          <input
            type="checkbox"
            name={name}
            id={uniqueId}
            className="absolute h-0 w-0 opacity-0 cursor-pointer"
            checked={checked}
            onChange={() => {
              setChecked(!checked);
              setCheckedValue(checkedValue === 0 ? 1 : 0);
            }}
          />
          <span
            className={`checkmark bg-transparent rounded-sm
              absolute top-0.5 left-0 w-4 h-4 border border-solid border-w-blue 
              after:absolute after:hidden after:top-0 after:left-[4px] after:w-[5px] after:h-2.5 after:border-t-0 after:border-l-0 after:border-[3px] after:border-solid after:border-w-blue after:rotate-45
            `}
          ></span>
        </div>
      )}
    </>
  );
};

export default Checkbox;
