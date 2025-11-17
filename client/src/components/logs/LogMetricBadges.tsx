import React from 'react';
import { LogEntry } from '../../hooks/useLogs';
import { getScaleColor } from '../../constants/logItemMaps';

interface LogMetricBadgesProps {
  log: LogEntry;
}

export const LogMetricBadges: React.FC<LogMetricBadgesProps> = ({ log }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center mb-4">
      <div className="flex flex-col items-center">
        <span className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${getScaleColor(log.mood)}`}>
          {log.mood}
        </span>
        <span className="text-xs mt-1 text-gray-600">Mood</span>
      </div>
      <div className="flex flex-col items-center">
        <span className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${getScaleColor(log.anxiety)}`}>
          {log.anxiety}
        </span>
        <span className="text-xs mt-1 text-gray-600">Anxiety</span>
      </div>
      <div className="flex flex-col items-center">
        <span className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${getScaleColor(log.stress)}`}>
          {log.stress}
        </span>
        <span className="text-xs mt-1 text-gray-600">Stress</span>
      </div>
      <div className="flex flex-col items-center">
        <span className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${getScaleColor(log.sleepQuality)}`}>
          {log.sleepQuality}
        </span>
        <span className="text-xs mt-1 text-gray-600">Quality</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xl font-bold text-indigo-600">
          {log.sleep}h
        </span>
        <span className="text-xs mt-1 text-gray-600">Sleep</span>
      </div>
    </div>
  );
};