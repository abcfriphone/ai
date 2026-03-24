import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: number;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon: Icon, trend }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
          <Icon size={24} />
        </div>
        {trend !== undefined && (
          <span className={`text-sm font-medium px-2 py-1 rounded-full ${trend >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      {subtitle && <p className="text-gray-400 text-xs mt-1">{subtitle}</p>}
    </div>
  );
};
