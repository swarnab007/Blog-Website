import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type="text"
        className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-800"
        ref={ref}
        id={id}
        {...props}
      />
    </div>
  );
});

export default Input;
