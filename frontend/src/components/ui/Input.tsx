import React from 'react';

// Counter for generating unique IDs
let inputCounter = 0;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}) => {
  // Use a stable ID generation approach to avoid hydration mismatches
  const [inputId] = React.useState(() => id || `input-${++inputCounter}`);
  
  const baseClasses = 'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
  
  const errorClasses = error ? 'border-red-500 focus-visible:ring-red-500' : '';
  
  const classes = `${baseClasses} ${errorClasses} ${className}`;

  return (
    <div className="space-y-2" suppressHydrationWarning>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={classes}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Input; 