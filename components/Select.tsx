import React from "react";
import Select, { StylesConfig } from "react-select";

interface Attribute {
  value: string;
  label: string;
}

interface MyComponentProps {
  placeholder: String;
  options: Attribute[];
  selectedValues: any;
  onSelectChange: (selectedOptions: any) => void;
}

const customStyles: StylesConfig<Attribute, true> = {
  control: (provided, { isFocused }) => ({
    ...provided,
    //border: "1px solid #f8f8f8", // Customize the border
    padding: "4px 0",
    margin: "0 0",
    borderRadius: "6px", // Customize the border radius
    backgroundColor: "#fff",
    borderColor: isFocused ? "#6CA7FF" : "#EFF2F4",
  }),
  option: (provided, { isDisabled, isFocused, isSelected }) => ({
    ...provided,
    backgroundColor: isFocused ? "#6CA7FF" : null,
    color: isFocused ? "#fff" : "#2a2a2a",
    cursor: isDisabled ? "not-allowed" : "default",
    ":active": {
      ...provided[":active"],
      backgroundColor: !isDisabled ? (isSelected ? "#fffs" : "#fff") : undefined,
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#6CA7FF", // Customize the background color of selected values
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#2a2a2a", // Customize the color of selected values
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#2a2a2a", // Customize the color of the remove icon in selected values
    ":hover": {
      backgroundColor: "#FFF", // Customize the background color on hover
      color: "#555", // Customize the color on hover
    },
  }),
};

const MyComponent: React.FC<MyComponentProps> = ({
  options,
  selectedValues,
  onSelectChange,
  placeholder,
  ismulti
}) => {
  return (
    <>
    {ismulti ? (
      <Select
        className="w-full rounded-md"
        options={options}
        placeholder={placeholder}
        value={selectedValues}
        styles={customStyles}
        onChange={(selectedOptions) => onSelectChange(selectedOptions)}
        isMulti // Add isMulti prop if ismulti is true
      />
    ) : (
      <Select
        options={options}
        placeholder={placeholder}
        value={selectedValues}
        styles={customStyles}
        onChange={(selectedOptions) => onSelectChange(selectedOptions)}
      />
    )}
  </>
   
  );
};

export default MyComponent;
