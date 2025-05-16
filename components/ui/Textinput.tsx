import React, { useState, FocusEventHandler, ChangeEventHandler } from "react";
import Icon from "@/components/ui/Icon";
// import Cleave from "cleave.js/react";
import "cleave.js/dist/addons/cleave-phone.us";

interface TextinputProps {
  type: string;
  label?: string;
  placeholder?: string;
  classLabel?: string;
  className?: string;
  classGroup?: string;
  register?: any; // replace any with actual type if using form libraries
  name?: string;
  readonly?: boolean;
  value?: string;
  error?: any; // replace any with actual type if using form libraries
  icon?: string;
  disabled?: boolean;
  id?: string;
  horizontal?: boolean;
  validate?: string;
  isMask?: boolean;
  msgTooltip?: boolean;
  description?: string;
  hasicon?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  options?: object;
  onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  defaultValue?: string;
}

const Textinput: React.FC<TextinputProps> = ({
  type,
  label,
  placeholder = "Add placeholder",
  classLabel = "form-label",
  className = "",
  classGroup = "",
  register,
  name,
  readonly,
  value,
  error,
  icon,
  disabled,
  id,
  horizontal,
  validate,
  isMask,
  msgTooltip,
  description,
  hasicon,
  onChange,
  options,
  onFocus,
  defaultValue,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div
      className={`relative ${error ? "has-error" : ""}  ${
        horizontal ? "flex" : ""
      }  ${validate ? "is-valid" : ""} `}
    >
      {label && (
        <label
          htmlFor={id}
          className={`block capitalize ${classLabel}  ${
            horizontal ? "flex-0 mr-6 md:w-[100px] w-[60px] break-words" : ""
          }`}
        >
          {label}
        </label>
      )}
      <div className={`relative ${horizontal ? "flex-1" : ""}`}>
        {name && !isMask && (
          <input
            type={type === "password" && open === true ? "text" : type}
            {...register(name)}
            {...rest}
            className={`${
              error ? " has-error" : " "
            } bg-white border border-gray-200 w-full rounded-md px-2 py-3 ${className}  `}
            placeholder={placeholder}
            readOnly={readonly}
            defaultValue={defaultValue}
            disabled={disabled}
            id={id}
            onChange={onChange}
          />
        )}
        {!name && !isMask && (
          <input
            type={type === "password" && open === true ? "text" : type}
            className={`bg-white w-full px-2 py-3 ${className}`}
            placeholder={placeholder}
            readOnly={readonly}
            disabled={disabled}
            defaultValue={defaultValue}
            onChange={onChange}
            id={id}
          />
        )}
        {name && isMask && (
          <Cleave
            {...register(name)}
            {...rest}
            placeholder={placeholder}
            options={options}
            className={`${
              error ? " has-error" : " "
            } absolute top-3 bg-blue-200 w-full px-2 py-2 ${className}  `}
            onFocus={onFocus}
            id={id}
            readOnly={readonly}
            disabled={disabled}
            onChange={onChange as ChangeEventHandler<HTMLInputElement>}
          />
        )}
        {!name && isMask && (
          <Cleave
            placeholder={placeholder}
            options={options}
            className={`${
              error ? " has-error" : " "
            } bg-blue-200 w-full py-2 ${className}  `}
            onFocus={onFocus}
            id={id}
            readOnly={readonly}
            disabled={disabled}
            onChange={onChange as ChangeEventHandler<HTMLInputElement>}
          />
        )}
        {/* icon */}
        <div className="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse">
          {hasicon && (
            <span
              className="cursor-pointer text-secondary-500"
              onClick={handleOpen}
            >
              {open && type === "password" && (
                <Icon icon="heroicons-outline:eye" />
              )}
              {!open && type === "password" && (
                <Icon icon="heroicons-outline:eye-off" />
              )}
            </span>
          )}

          {error && (
            <span className="text-danger-500">
              <Icon icon="heroicons-outline:information-circle" />
            </span>
          )}
          {validate && (
            <span className="text-success-500">
              <Icon icon="bi:check-lg" />
            </span>
          )}
        </div>
      </div>
      {/* error and success message*/}
      {error && (
        <div
          className={`absolute right-0 bottom-0 mt-2 ${
            msgTooltip
              ? " inline-block bg-danger-500 text-white text-[10px] px-2 py-1 rounded"
              : " text-danger-500 block text-sm"
          }`}
        >
          {error.message}
        </div>
      )}
      {/* validated and success message*/}
      {validate && (
        <div
          className={` mt-2 ${
            msgTooltip
              ? " inline-block bg-success-500 text-white text-[10px] px-2 py-1 rounded"
              : " text-success-500 block text-sm"
          }`}
        >
          {validate}
        </div>
      )}
      {/* only description */}
      {description && <span className="input-description">{description}</span>}
    </div>
  );
};

export default Textinput;
