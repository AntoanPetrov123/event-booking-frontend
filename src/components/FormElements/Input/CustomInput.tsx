import type { ChangeEvent } from 'react';
import './CustomInput.css';

type CustomInputProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const CustomInput = ({
  label,
  name,
  type = 'text',
  value,
  placeholder,
  error,
  required = false,
  onChange,
}: CustomInputProps) => {
  return (
    <div className="custom-input">
      <label htmlFor={name} className="custom-input__label">
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        className={`custom-input__field ${
          error ? 'custom-input__field--error' : ''
        }`}
      />

      {error && (
        <span className="custom-input__error">
          {error}
        </span>
      )}
    </div>
  );
};

export default CustomInput;