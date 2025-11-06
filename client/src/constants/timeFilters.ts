export type TimeFilter = '1d' | '7d' | '14d' | '30d' | '90d' | '1y' | 'all';

export interface TimeFilterOption {
  value: TimeFilter;
  label: string;
}

export const TIME_FILTERS: TimeFilterOption[] = [
  { value: '7d', label: '7 days' },
  { value: '14d', label: '14 days' },
  { value: '30d', label: '30 days' },
  { value: '90d', label: '3 months' },
  { value: '1y', label: '1 year' },
  { value: 'all', label: 'All time' },
];