import React from 'react';
import { format } from 'date-fns';

interface DateSelectorProps {
  value: string;
  onChange: (date: string) => void;
}

export const DateSelector: React.FC<DateSelectorProps> = ({ value, onChange }) => {
  const isToday = value === format(new Date(), 'yyyy-MM-dd');
  
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="log-date" className="text-sm font-medium text-gray-700">
        Log date:
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        id="log-date"
        type="date"
        max={format(new Date(), 'yyyy-MM-dd')}
        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2 border"
      />
      {!isToday && (
        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
          Retroactive log
        </span>
      )}
    </div>
  );
};