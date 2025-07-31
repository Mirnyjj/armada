interface SimpleCardProps {
  title: string;
  value: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  className?: string;
}

export function SimpleCard({ title, value, description, icon, badge, className = "" }: SimpleCardProps) {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between space-y-0 pb-2">
        <h4 className="text-sm font-medium text-gray-600">{title}</h4>
        {icon && <div className="h-4 w-4 text-gray-400">{icon}</div>}
        {badge && badge}
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {description && <p className="text-xs text-gray-500">{description}</p>}
      </div>
    </div>
  );
}