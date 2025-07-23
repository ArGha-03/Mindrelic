import React from "react";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  reference?: any; 
  label?: string; 
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, type = "text", label, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2, 7)}`;
    return (
      <div className="mb-4">
        {label && (
          <label htmlFor={inputId} className="block mb-1 text-gray-700 font-medium">
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          ref={ref ?? props.reference}
          {...props}
        />
      </div>
    );
  }
);
