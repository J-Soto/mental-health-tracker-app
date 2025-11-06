import React from 'react';
import { METRICS } from '../../constants/chartMetrics';

interface MetricSelectorProps {
  selectedMetrics: string[];
  onMetricChange: (index: number, newKey: string) => void;
}

export const MetricSelector: React.FC<MetricSelectorProps> = ({ 
  selectedMetrics, 
  onMetricChange 
}) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex flex-wrap gap-4 items-center">
        <span className='text-sm font-semibold text-gray-700'>Select 3 metrics:</span>
        {selectedMetrics.map((key, index) => (
          <select
            key={index}
            value={key}
            onChange={(e) => onMetricChange(index, e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2 border font-medium"
          >
            {METRICS.map(metric => (
              <option 
                key={metric.key} 
                value={metric.key}
                disabled={selectedMetrics.filter((_, i) => i !== index).includes(metric.key)}
              >
                {metric.label}
              </option>
            ))}
          </select>
        ))}
      </div>
    </div>
  );
};