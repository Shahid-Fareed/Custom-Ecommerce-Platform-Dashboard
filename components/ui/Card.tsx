import React, { ReactNode } from "react";

interface CardProps {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
  headerslot?: ReactNode;
  className?: string;
  bodyClass?: string;
  noborder?: boolean;
  titleClass?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  headerslot,
  className = "custom-class bg-white",
  bodyClass = "p-6",
  noborder,
  titleClass = "custom-class",
}) => {
  return (
    <div
      className={`
        card rounded-md ${className}`}
    >
      {(title || subtitle) && (
        <header className={`card-header ${noborder ? "no-border" : ""}`}>
          <div>
            {title && <div className={`card-title ${titleClass}`}>{title}</div>}
            {subtitle && <div className="card-subtitle">{subtitle}</div>}
          </div>
          {headerslot && <div className="card-header-slot">{headerslot}</div>}
        </header>
      )}
      <main className={`card-body !px-0 !py-3 ${bodyClass}`}>{children}</main>
    </div>
  );
};

export default Card;
