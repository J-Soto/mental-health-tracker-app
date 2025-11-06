import { format, isToday, isYesterday } from 'date-fns';

export const formatSmartDate = (date: Date): string => {
  if (isToday(date)) {
    return 'Today';
  }
  if (isYesterday(date)) {
    return 'Yesterday';
  }
  return format(date, "EEEE, MMMM d, yyyy");
};