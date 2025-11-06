import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartData } from 'chart.js';

interface MetricChartProps {
  chartData: ChartData<'line'>;
  chartOptions: any;
}

export const MetricChart: React.FC<MetricChartProps> = ({ chartData, chartOptions }) => {
  return (
    <div className="relative h-96 w-full bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <Line options={chartOptions} data={chartData} />
    </div>
  );
};