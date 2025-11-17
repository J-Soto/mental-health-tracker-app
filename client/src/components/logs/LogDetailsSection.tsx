import React from 'react';
import { LogEntry } from '../../hooks/useLogs';

interface LogDetailsSectionProps {
  log: LogEntry;
}

export const LogDetailsSection: React.FC<LogDetailsSectionProps> = ({ log }) => {
  return (
    <div className="space-y-2 text-sm">
      <p className='text-gray-700 font-medium border-t pt-2'>
        Social Activity: <span className="font-normal text-gray-600">
          {log.socialInteractions > 0 ? `${log.socialInteractions} interactions` : 'No social activity recorded'}
        </span>
      </p>
      
      <p className='text-gray-700 font-medium'>
        Physical Activity: <span className={`font-normal ${log.physicalActivity ? 'text-gray-600' : 'text-gray-400 italic'}`}>
          {log.physicalActivity || 'No physical activity recorded'}
        </span>
      </p>

      <div className='p-3 bg-amber-50 border border-amber-200 rounded mt-2'>
        <p className="font-medium text-amber-900 mb-1">Sleep Disturbances:</p>
        <p className={`whitespace-pre-wrap ${log.sleepDisturbances ? 'text-amber-800' : 'text-amber-600 italic'}`}>
          {log.sleepDisturbances || 'No sleep disturbances recorded'}
        </p>
      </div>

      <div className='p-3 bg-gray-50 border rounded mt-2'>
        <p className="font-medium text-gray-900 mb-1">Notes/Symptoms:</p>
        <p className={`whitespace-pre-wrap ${log.symptoms ? 'text-gray-800' : 'text-gray-600 italic'}`}>
          {log.symptoms || 'No symptoms or notes recorded'}
        </p>
      </div>
    </div>
  );
};