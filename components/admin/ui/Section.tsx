import React from 'react';

interface SectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export default function Section({
  title,
  description,
  children,
  actions,
  className = '',
}: SectionProps) {
  return (
    <div className={`mb-4 ${className}`}>
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h4 className="mb-1">{title}</h4>
          {description && (
            <p className="text-muted mb-0"><small>{description}</small></p>
          )}
        </div>
        {actions && <div>{actions}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}
