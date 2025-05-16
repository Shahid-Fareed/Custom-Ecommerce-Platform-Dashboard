import React, { ChangeEvent, TextareaHTMLAttributes } from "react";
import Icon from "@/components/ui/Icon";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  classLabel?: string;
  className?: string;
  classGroup?: string;
  register?: any;
  name?: string;
  readonly?: boolean;
  dvalue?: any;
  error?: any;
  icon?: string;
  disabled?: boolean;
  id?: string;
  horizontal?: boolean;
  validate?: string;
  msgTooltip?: boolean;
  description?: string;
  cols?: number;
  row?: number;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  placeholder,
  classLabel = "form-label",
  className = "",
  classGroup = "",
  register,
  name,
  readonly,
  dvalue,
  error,
  icon,
  disabled,
  id,
  horizontal,
  validate,
  msgTooltip,
  description,
  cols,
  row = 3,
  onChange,
  ...rest
}) => {
  return (
    <div
      className={`fromGroup  ${error ? "has-error" : ""}  ${
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
        {name && (
          <textarea
            {...register(name)}
            {...rest}
            className={`${
              error ? " has-error" : " "
            } w-full p-2 border border-gray-100 rounded-sm ${className}`}
            placeholder={placeholder}
            readOnly={readonly}
            disabled={disabled}
            id={id}
            cols={cols}
            rows={row}
            onChange={onChange}
          ></textarea>
        )}
        {!name && (
          <textarea
            className={`${
              error ? " has-error" : " "
            } w-full py-2 ${className}  `}
            placeholder={placeholder}
            readOnly={readonly}
            disabled={disabled}
            id={id}
            cols={cols}
            rows={row}
            onChange={onChange}
          ></textarea>
        )}

        {/* icon */}
        <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse">
          {error && (
            <span className="text-danger-500">
              <Icon
                icon="heroicons-outline:information-circle"
                className={undefined}
                width={undefined}
                rotate={undefined}
                hFlip={undefined}
                vFlip={undefined}
              />
            </span>
          )}
          {validate && (
            <span className="text-success-500">
              <Icon
                icon="bi:check-lg"
                className={undefined}
                width={undefined}
                rotate={undefined}
                hFlip={undefined}
                vFlip={undefined}
              />
            </span>
          )}
        </div>
      </div>
      {/* error and success message*/}
      {error && (
        <div
          className={`bg-red-300 mt-2 ${
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
          className={`bg-red-300 mt-2 ${
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

export default Textarea;
