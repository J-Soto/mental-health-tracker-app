import React from 'react';
import { LogEntry } from '../../hooks/useLogs';
import { format } from 'date-fns';
import { formatSmartDate } from '../../utils/dateFormatters';
import { DeleteLogButton } from './DeleteLogButton';
import { LogMetricBadges } from './LogMetricBadges';
import { LogDetailsSection } from './LogDetailsSection';

interface LogItemProps {
  log: LogEntry;
}

export const LogItem: React.FC<LogItemProps> = ({ log }) => {
  const date = new Date(log.date);
  const smartDate = formatSmartDate(date);
  const time = format(date, 'h:mm a');

  return (
    <div className="bg-white p-5 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-200 mb-4">
      <div className="flex justify-between items-start border-b pb-3 mb-3">
        <h3 className="text-lg font-bold text-indigo-700">
          Log: {smartDate}
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-700">
            Time: {time}
          </span>
          <DeleteLogButton logId={log.id} />
        </div>
      </div>

      <LogMetricBadges log={log} />
      <LogDetailsSection log={log} />
    </div>
  );
};