import React from 'react';

interface EmptyChartStateProps {
  timeFilter: string;
}

export const EmptyChartState: React.FC<EmptyChartStateProps> = ({ timeFilter }) => {
  return (
    <div className="text-center p-10 bg-white rounded-xl shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-2">Trends Visualization</h3>
      <p className="text-gray-600">
        {timeFilter === '1d' 
          ? 'No records in the last 24 hours.'
          : 'You need at least one daily record to generate the chart.'}
      </p>
    </div>
  );
};