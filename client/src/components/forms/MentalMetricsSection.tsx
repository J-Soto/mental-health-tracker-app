import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { ScaleInput } from '../ui/ScaleInput';
import { MOOD_MAP, ANXIETY_STRESS_MAP, SLEEP_QUALITY_MAP } from '../../constants/formMaps';

interface MentalMetricsSectionProps {
  control: Control<any>;
}

export const MentalMetricsSection: React.FC<MentalMetricsSectionProps> = ({ control }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Controller
        name="mood"
        control={control}
        render={({ field }) => (
          <ScaleInput
            label="1. Mood State"
            name={field.name}
            value={field.value}
            min={1}
            max={5}
            onChange={field.onChange}
            descriptionMap={MOOD_MAP}
          />
        )}
      />

      <Controller
        name="anxiety"
        control={control}
        render={({ field }) => (
          <ScaleInput
            label="2. Anxiety Level"
            name={field.name}
            value={field.value}
            min={1}
            max={5}
            onChange={field.onChange}
            descriptionMap={ANXIETY_STRESS_MAP}
          />
        )}
      />

      <Controller
        name="stress"
        control={control}
        render={({ field }) => (
          <ScaleInput
            label="3. Stress Level"
            name={field.name}
            value={field.value}
            min={1}
            max={5}
            onChange={field.onChange}
            descriptionMap={ANXIETY_STRESS_MAP}
          />
        )}
      />

      <Controller
        name="sleepQuality"
        control={control}
        render={({ field }) => (
          <ScaleInput
            label="4. Sleep Quality"
            name={field.name}
            value={field.value}
            min={1}
            max={5}
            onChange={field.onChange}
            descriptionMap={SLEEP_QUALITY_MAP}
          />
        )}
      />
    </div>
  );
};