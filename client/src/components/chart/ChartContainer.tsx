import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { useLogs } from '../../hooks/useLogs';
import { useChartData } from '../../hooks/useChartData';
import { METRICS } from '../../constants/chartMetrics';
import { TimeFilter } from '../../constants/timeFilters';
import { createChartDatasets, createChartOptions } from '../../utils/chartConfig';
import { TimeFilterSelector } from './TimeFilterSelector';
import { MetricSelector } from './MetricSelector';
import { MetricChart } from './MetricChart';
import { ChartInfoTip } from './ChartInfoTip';
import { EmptyChartState } from './EmptyChartState';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const ChartContainer: React.FC = () => {
  const { logs, isLoading, error } = useLogs();
  
  const [selectedMetrics, setSelectedMetrics] = useState([
    METRICS[0].key,
    METRICS[1].key,
    METRICS[2].key,
  ]);
  
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('7d');

  const { processedLogs, labels, xAxisLabel, isHourlyView } = useChartData(logs, timeFilter);

  const handleMetricChange = (index: number, newKey: string) => {
    setSelectedMetrics(prev => {
      const newSelections = [...prev];
      newSelections[index] = newKey;
      return newSelections;
    });
  };

  if (isLoading) {
    return <p className="text-center p-4">Loading chart data...</p>;
  }

  if (error) {
    return <p className="text-center p-4 text-red-600">Error loading chart data.</p>;
  }

  if (processedLogs.length < 1) {
    return <EmptyChartState timeFilter={timeFilter} />;
  }

  const datasets = createChartDatasets(selectedMetrics, METRICS, processedLogs);
  const chartOptions = createChartOptions(
    selectedMetrics,
    METRICS,
    processedLogs,
    timeFilter,
    xAxisLabel,
    isHourlyView
  );

  const chartData: ChartData<'line'> = {
    labels: labels,
    datasets: datasets as any,
  };

  return (
    <div className="p-6 bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-lg border border-purple-100">
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h2 className="text-2xl font-bold text-gray-800">
          📈 Personalized Mental Health Trends
        </h2>
        
        <TimeFilterSelector value={timeFilter} onChange={setTimeFilter} />
      </div>
      
      <MetricSelector 
        selectedMetrics={selectedMetrics} 
        onMetricChange={handleMetricChange}
      />

      <div className="mt-6">
        <MetricChart chartData={chartData} chartOptions={chartOptions} />
      </div>
      
      <div className="mt-4">
        <ChartInfoTip isHourlyView={isHourlyView} />
      </div>
    </div>
  );
};