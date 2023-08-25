import React, { useRef, InputHTMLAttributes } from 'react';
import '../assets/styles/style.css';

interface InputProp extends InputHTMLAttributes<HTMLInputElement> {
  clear?: any;
  error?: boolean | null;
  value?: string;
}

const Inputs: React.FC<InputProp> = ({
  type,
  error,
  name,
  required,
  onChange,
  value,
  placeholder,
  clear,
  autoComplete,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="input_container">
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        ref={inputRef}
        autoComplete="new-off"
        className={error ? 'error inputText' : 'inputText'}
        {...props}
      />
    </div>
  );
};

export default Inputs;
