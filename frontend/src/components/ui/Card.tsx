import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  const baseClasses = 'rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm';
  const classes = `${baseClasses} ${className}`;

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
  const baseClasses = 'flex flex-col space-y-1.5 p-6';
  const classes = `${baseClasses} ${className}`;

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className = '' }) => {
  const baseClasses = 'text-2xl font-semibold leading-none tracking-tight';
  const classes = `${baseClasses} ${className}`;

  return (
    <h3 className={classes}>
      {children}
    </h3>
  );
};

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ children, className = '' }) => {
  const baseClasses = 'text-sm text-gray-500';
  const classes = `${baseClasses} ${className}`;

  return (
    <p className={classes}>
      {children}
    </p>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => {
  const baseClasses = 'p-6 pt-0';
  const classes = `${baseClasses} ${className}`;

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
  const baseClasses = 'flex items-center p-6 pt-0';
  const classes = `${baseClasses} ${className}`;

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Card; 