import React from 'react';
import { Controller, Control } from 'react-hook-form';

interface NotesSectionProps {
  control: Control<any>;
}

export const NotesSection: React.FC<NotesSectionProps> = ({ control }) => {
  return (
    <div className="space-y-4">
      <div className='bg-white p-5 rounded-lg border'>
        <label htmlFor="physicalActivity" className="block text-sm font-medium text-gray-700 mb-1">
          7. Physical Activity (Type and Duration)
        </label>
        <Controller
          name="physicalActivity"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              value={field.value ?? ''}
              id="physicalActivity"
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              placeholder="E.g: 30 minutes of brisk walking."
            />
          )}
        />
      </div>

      <div className='bg-white p-5 rounded-lg border'>
        <label htmlFor="sleepDisturbances" className="block text-sm font-medium text-gray-700 mb-1">
          8. Sleep Disturbances (Interruptions, Nightmares, etc.)
        </label>
        <Controller
          name="sleepDisturbances"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              value={field.value ?? ''}
              id="sleepDisturbances"
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              placeholder="E.g: Woke up 3 times during the night, had nightmares."
            />
          )}
        />
      </div>

      <div className='bg-white p-5 rounded-lg border'>
        <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-1">
          9. Anxiety/Depression Symptoms and Notes (Optional)
        </label>
        <Controller
          name="symptoms"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              value={field.value ?? ''}
              id="symptoms"
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              placeholder="E.g: Felt low energy today, but exercise helped. (General notes field)"
            />
          )}
        />
      </div>
    </div>
  );
};