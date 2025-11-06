import React from 'react';

interface ChartInfoTipProps {
  isHourlyView: boolean;
}

export const ChartInfoTip: React.FC<ChartInfoTipProps> = ({ isHourlyView }) => {
  return (
    <div className='p-4 bg-indigo-50 rounded-lg border border-indigo-200'>
      <p className='text-sm text-indigo-800'>
        <strong>💡 Tip:</strong> {isHourlyView 
          ? 'Hourly view: shows all records from the last 24 hours. You can see how your metrics evolve during the day.'
          : 'Daily view: shows the last record of each day. Level metrics (1-5) use the left axis.'
        } Hover over a specific point to see its values.
      </p>
    </div>
  );
};