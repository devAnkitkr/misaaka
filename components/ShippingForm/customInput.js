import React from 'react';

export default function CustomInput({
  type,
  name,
  value,
  label,
  handleInputChange,
  pattern,
  required,
  minlength,
}) {
  return (
    <div className="flex flex-col relative my-5 border rounded">
      <label
        className={`absolute left-2  transition-[top] ease-in duration-150 text-caption text-sm ${
          value && value.length > 0 ? '-top-3 bg-white p-0 z-20' : 'top-2'
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder=""
        onChange={(e) => handleInputChange(e)}
        className="p-2 border-none outline-none text-active z-10 bg-transparent"
        pattern={pattern}
        required={required}
        minLength={minlength}
      />
    </div>
  );
}
