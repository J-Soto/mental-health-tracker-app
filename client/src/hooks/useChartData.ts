import { useMemo } from 'react';
import { LogEntry } from './useLogs';
import { TimeFilter } from '../constants/timeFilters';
import { subDays, subYears, isAfter, parseISO, format, getYear } from 'date-fns';

interface ProcessedChartData {
  filteredLogs: LogEntry[];
  isHourlyView: boolean;
  processedLogs: LogEntry[];
  labels: string[];
  xAxisLabel: string;
}

export const useChartData = (logs: LogEntry[] | undefined, timeFilter: TimeFilter): ProcessedChartData => {
  return useMemo(() => {
    if (!logs || logs.length === 0) {
      return { 
        filteredLogs: [], 
        isHourlyView: false,
        processedLogs: [],
        labels: [],
        xAxisLabel: 'Date'
      };
    }
    
    const now = new Date();
    let filteredLogs: LogEntry[];
    let isHourlyView = false;
    
    // Filter logs by time period
    if (timeFilter === '1d') {
      const oneDayAgo = subDays(now, 1);
      filteredLogs = logs.filter(log => isAfter(parseISO(log.date), oneDayAgo));
      isHourlyView = true;
    } else if (timeFilter === 'all') {
      filteredLogs = logs;
    } else {
      let cutoffDate: Date;
      switch (timeFilter) {
        case '7d': cutoffDate = subDays(now, 7); break;
        case '14d': cutoffDate = subDays(now, 14); break;
        case '30d': cutoffDate = subDays(now, 30); break;
        case '90d': cutoffDate = subDays(now, 90); break;
        case '1y': cutoffDate = subYears(now, 1); break;
        default: cutoffDate = subDays(now, 7);
      }
      filteredLogs = logs.filter(log => isAfter(parseISO(log.date), cutoffDate));
    }

    // Process logs for display
    let processedLogs: LogEntry[];
    let labels: string[];
    let xAxisLabel: string;

    if (isHourlyView) {
      // Hourly view - show all logs with time
      processedLogs = [...filteredLogs].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      labels = processedLogs.map(log => format(parseISO(log.date), 'HH:mm'));
      xAxisLabel = 'Time (24h)';
    } else {
      // Daily view - deduplicate by date, keeping last entry
      const dailyDataMap = new Map<string, LogEntry>();
      const sortedLogs = [...filteredLogs].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      sortedLogs.forEach(log => {
        const dateKey = format(parseISO(log.date), 'yyyy-MM-dd');
        dailyDataMap.set(dateKey, log);
      });

      processedLogs = Array.from(dailyDataMap.values()).sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      const hasMultipleYears = processedLogs.length > 1 && 
        getYear(parseISO(processedLogs[0].date)) !== getYear(parseISO(processedLogs[processedLogs.length - 1].date));

      // Format labels based on time period
      if (timeFilter === '7d' || timeFilter === '14d') {
        labels = processedLogs.map(log => format(parseISO(log.date), 'EEE dd'));
        xAxisLabel = 'Date';
      } else if (timeFilter === '30d') {
        labels = processedLogs.map(log => format(parseISO(log.date), 'MMM dd'));
        xAxisLabel = 'Date';
      } else if (timeFilter === '90d') {
        labels = processedLogs.map(log => format(parseISO(log.date), 'MMM dd'));
        xAxisLabel = 'Month';
      } else if (timeFilter === '1y') {
        labels = processedLogs.map(log => format(parseISO(log.date), 'MMM yyyy'));
        xAxisLabel = 'Month';
      } else {
        if (hasMultipleYears) {
          labels = processedLogs.map(log => format(parseISO(log.date), 'MMM yyyy'));
          xAxisLabel = 'Date';
        } else {
          labels = processedLogs.map(log => format(parseISO(log.date), 'MMM dd'));
          xAxisLabel = 'Date';
        }
      }
    }

    return {
      filteredLogs,
      isHourlyView,
      processedLogs,
      labels,
      xAxisLabel
    };
  }, [logs, timeFilter]);
};