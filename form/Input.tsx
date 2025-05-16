// components/Input.tsx

import { ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface InputProps {
  type?: string;
  name: string;
  placeholder?: string;
  inputClass?: string;
  labelFor?: boolean;
}

const Input: React.FC<InputProps> = ({ type, name, placeholder, inputClass, labelFor }: InputProps) => {
  const uniqueId = uuidv4();
  console.log('Input');

  return (
    <>
      {name && (
        <div className="form-group">
          {/* Label */}
          {placeholder && (
            <label htmlFor={uniqueId} className={labelFor === true ? '' : 'hidden'}>
              {placeholder}
            </label>
          )}

          {/* Input */}
          <input
            type={type ? type : 'text'}
            placeholder={placeholder ? placeholder : undefined}
            name={name}
            id={uniqueId}
            className={`w-full ${inputClass ? inputClass : ''}`}
          />
        </div>
      )}
    </>
  );
};

export default Input;

