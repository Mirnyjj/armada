interface SimpleTableProps {
  headers: string[];
  children: React.ReactNode;
}

export function SimpleTable({ headers, children }: SimpleTableProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function SimpleTableRow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <tr className={`hover:bg-gray-50 transition-colors duration-150 ${className}`}>{children}</tr>;
}

export function SimpleTableCell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-3 sm:px-4 py-3 text-sm text-gray-900 ${className}`}>{children}</td>;
}