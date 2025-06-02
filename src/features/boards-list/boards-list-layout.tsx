import React from "react";

export function BoardListLayout({
  header,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
}) {
  return <div className="container mx-auto p-4">{header}</div>;
}

export function BoardListLayoutHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold mb-6">{title}</h1>
        {description && <p className="text-gray-500">{description}</p>}
      </div>

      {actions}
    </div>
  );
}

export function BoardListLayoutFilters({
  children,
	actions
}: {
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-center mb-6">
      {children}
      {actions}
    </div>
  );
}

export function BoardListLayoutFilter() {
  return <div className="mb-8"></div>;
}
