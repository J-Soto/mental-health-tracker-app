import { LogEntry } from '../hooks/useLogs';
import { ChartMetric } from '../constants/chartMetrics';
import { TimeFilter, TIME_FILTERS } from '../constants/timeFilters';
import { format, parseISO } from 'date-fns';

export const createChartDatasets = (
  selectedMetrics: string[],
  metrics: ChartMetric[],
  processedLogs: LogEntry[]
) => {
  return selectedMetrics.map((key) => {
    const metric = metrics.find(m => m.key === key)!;
    
    return {
      label: metric.label,
      data: processedLogs.map(log => (log as any)[metric.key]),
      borderColor: metric.color,
      backgroundColor: metric.color.replace('1)', '0.4)'),
      yAxisID: metric.scale === 'level' ? 'level' : metric.scale,
      tension: 0.3,
      pointRadius: 5,
      pointHoverRadius: 7,
      pointBorderWidth: 2,
      pointBackgroundColor: metric.color,
    };
  });
};

const getRightAxisConfig = (
  selectedMetrics: string[],
  metrics: ChartMetric[],
  processedLogs: LogEntry[]
) => {
  const hasHours = selectedMetrics.some(key => metrics.find(m => m.key === key)?.scale === 'hours');
  const hasCount = selectedMetrics.some(key => metrics.find(m => m.key === key)?.scale === 'count');
  
  // Si tiene ambos, priorizamos 'hours' y 'count' usará el mismo eje
  if (hasHours && hasCount) {
    const maxSleep = Math.max(...processedLogs.map(log => log.sleep));
    const maxSocial = Math.max(...processedLogs.map(log => log.socialInteractions));
    const maxValue = Math.max(maxSleep, maxSocial);
    
    return {
      hours: {
        type: 'linear' as const,
        position: 'right' as const,
        min: 0,
        max: Math.ceil(maxValue + 2),
        title: { 
          display: true, 
          text: 'Hours / Count',
          font: { size: 12, weight: 'bold' as const },
        },
        grid: { drawOnChartArea: false },
        display: true,
        ticks: {
          font: { size: 11 },
        },
      },
      count: {
        type: 'linear' as const,
        position: 'right' as const,
        min: 0,
        max: Math.ceil(maxValue + 2),
        title: { 
          display: false,
        },
        grid: { drawOnChartArea: false },
        display: false,
        ticks: {
          font: { size: 11 },
        },
      },
    };
  }
  
  // Solo hours
  if (hasHours) {
    return {
      hours: {
        type: 'linear' as const,
        position: 'right' as const,
        min: 0,
        max: Math.ceil(Math.max(...processedLogs.map(log => log.sleep)) + 2),
        title: { 
          display: true, 
          text: 'Hours (h)',
          font: { size: 12, weight: 'bold' as const },
        },
        grid: { drawOnChartArea: false },
        display: true,
        ticks: {
          font: { size: 11 },
        },
      },
      count: {
        type: 'linear' as const,
        position: 'right' as const,
        display: false,
      },
    };
  }
  
  // Solo count
  if (hasCount) {
    return {
      hours: {
        type: 'linear' as const,
        position: 'right' as const,
        display: false,
      },
      count: {
        type: 'linear' as const,
        position: 'right' as const,
        min: 0,
        max: Math.max(10, ...processedLogs.map(log => log.socialInteractions)) + 2,
        title: { 
          display: true, 
          text: 'Count',
          font: { size: 12, weight: 'bold' as const },
        },
        grid: { drawOnChartArea: false },
        display: true,
        ticks: {
          font: { size: 11 },
        },
      },
    };
  }
  
  // Ninguno
  return {
    hours: {
      type: 'linear' as const,
      position: 'right' as const,
      display: false,
    },
    count: {
      type: 'linear' as const,
      position: 'right' as const,
      display: false,
    },
  };
};

export const createChartOptions = (
  selectedMetrics: string[],
  metrics: ChartMetric[],
  processedLogs: LogEntry[],
  timeFilter: TimeFilter,
  xAxisLabel: string,
  isHourlyView: boolean
) => {
  const rightAxisConfig = getRightAxisConfig(selectedMetrics, metrics, processedLogs);
  
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          font: { size: 12, weight: 'bold' as const },
        },
      },
      title: {
        display: true,
        text: `Personalized Trends (${TIME_FILTERS.find(f => f.value === timeFilter)?.label})`,
        font: { size: 16, weight: 'bold' as const },
        padding: { bottom: 20 },
      },
      tooltip: {
        mode: 'point' as const,
        intersect: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: { size: 14, weight: 'bold' as const },
        bodyFont: { size: 13 },
        callbacks: {
          title: (context: any) => {
            const dataIndex = context[0].dataIndex;
            const log = processedLogs[dataIndex];
            if (isHourlyView) {
              return format(parseISO(log.date), 'MMM dd, yyyy HH:mm');
            }
            return format(parseISO(log.date), 'EEEE, MMMM dd, yyyy');
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: { size: 11 },
          maxRotation: 45,
          minRotation: 0,
          autoSkip: true,
          maxTicksLimit: timeFilter === '1d' ? 12 : timeFilter === 'all' ? 20 : 15,
        },
        title: {
          display: true,
          text: xAxisLabel,
          font: { size: 12, weight: 'bold' as const },
        },
      },
      level: {
        type: 'linear' as const,
        position: 'left' as const,
        min: 0,
        max: 6,
        ticks: { 
          stepSize: 1,
          font: { size: 11 },
        },
        title: { 
          display: selectedMetrics.some(key => metrics.find(m => m.key === key)?.scale === 'level'), 
          text: 'Level (1-5)',
          font: { size: 12, weight: 'bold' as const },
        },
        grid: { 
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
        },
        display: selectedMetrics.some(key => metrics.find(m => m.key === key)?.scale === 'level'),
      },
      ...rightAxisConfig,
    },
    interaction: {
      mode: 'point' as const,
      intersect: true,
    },
  };
};