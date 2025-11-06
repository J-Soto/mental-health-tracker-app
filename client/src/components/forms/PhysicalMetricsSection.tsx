import React from 'react';
import { Controller, Control, FieldErrors } from 'react-hook-form';

interface PhysicalMetricsSectionProps {
  control: Control<any>;
  errors: FieldErrors<any>;
}

export const PhysicalMetricsSection: React.FC<PhysicalMetricsSectionProps> = ({ control, errors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-5 rounded-lg border">
      <div>
        <label htmlFor="sleep" className="block text-sm font-medium text-gray-700">
          5. Sleep Hours (Total)
        </label>
        <Controller
          name="sleep"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="sleep"
              type="number"
              step="0.5"
              min="0"
              max="24"
              onChange={(e) => field.onChange(parseFloat(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
          )}
        />
        {errors.sleep && (
          <p className="mt-1 text-xs text-red-600">Must be a number between 0 and 24.</p>
        )}
      </div>
      
      <div>
        <label htmlFor="socialInteractions" className="block text-sm font-medium text-gray-700">
          6. Social Interactions Frequency
        </label>
        <Controller
          name="socialInteractions"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="socialInteractions"
              type="number"
              min="0"
              onChange={(e) => field.onChange(parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
          )}
        />
        {errors.socialInteractions && (
          <p className="mt-1 text-xs text-red-600">Must be a positive integer.</p>
        )}
      </div>
    </div>
  );
};