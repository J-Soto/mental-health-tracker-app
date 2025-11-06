export interface ChartMetric {
  key: string;
  label: string;
  color: string;
  scale: 'level' | 'hours' | 'count';
}

export const METRICS: ChartMetric[] = [
  { key: 'mood', label: 'Mood', color: 'rgba(75, 192, 192, 1)', scale: 'level' },
  { key: 'anxiety', label: 'Anxiety', color: 'rgba(255, 99, 132, 1)', scale: 'level' },
  { key: 'stress', label: 'Stress', color: 'rgba(54, 162, 235, 1)', scale: 'level' },
  { key: 'sleep', label: 'Sleep Hours', color: 'rgba(255, 159, 64, 1)', scale: 'hours' },
  { key: 'sleepQuality', label: 'Sleep Quality', color: 'rgba(153, 102, 255, 1)', scale: 'level' },
  { key: 'socialInteractions', label: 'Social Interactions', color: 'rgba(201, 203, 207, 1)', scale: 'count' },
];