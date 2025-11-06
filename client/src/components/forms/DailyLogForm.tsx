import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLogs } from '../../hooks/useLogs';
import { format } from 'date-fns';
import { DateSelector } from './DateSelector';
import { MentalMetricsSection } from './MentalMetricsSection';
import { PhysicalMetricsSection } from './PhysicalMetricsSection';
import { NotesSection } from './NotesSection';
import { FormSubmitButton } from './FormSubmitButton';

const formSchema = z.object({
  date: z.string().optional(),
  mood: z.number().int().min(1).max(5),
  anxiety: z.number().int().min(1).max(5),
  stress: z.number().int().min(1).max(5),
  sleepQuality: z.number().int().min(1).max(5),
  sleep: z.number().min(0.1).max(24),
  socialInteractions: z.number().int().min(0),
  physicalActivity: z.string().nullable(),
  sleepDisturbances: z.string().nullable(),
  symptoms: z.string().nullable(),
});

type FormInput = z.infer<typeof formSchema>;

const DEFAULT_VALUES: FormInput = {
  date: format(new Date(), 'yyyy-MM-dd'),
  mood: 3,
  anxiety: 3,
  stress: 3,
  sleepQuality: 3,
  sleep: 7.0,
  socialInteractions: 0,
  physicalActivity: '',
  sleepDisturbances: '',
  symptoms: '',
};

export const DailyLogForm: React.FC = () => {
  const { createLogMutation } = useLogs();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const selectedDate = watch('date');

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const isToday = data.date === format(new Date(), 'yyyy-MM-dd');
    const submitData = isToday ? { ...data, date: undefined } : data;

    createLogMutation.mutate(submitData, {
      onSuccess: () => {
        alert('Log saved successfully!');
        reset(DEFAULT_VALUES);
      },
      onError: (error) => {
        console.error('Error saving log:', error);
        alert('Error saving log. Please try again.');
      },
    });
  };

  return (
    <div className="p-6 bg-gradient-to-br from-white to-indigo-50 rounded-xl shadow-lg border border-indigo-100">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">
          Daily Mental Health Log
        </h2>

        <DateSelector
          value={selectedDate || format(new Date(), 'yyyy-MM-dd')}
          onChange={(date) => setValue('date', date)}
        />

        <MentalMetricsSection control={control} />

        <PhysicalMetricsSection control={control} errors={errors} />

        <NotesSection control={control} />

        <FormSubmitButton isSubmitting={isSubmitting} />
      </form>
    </div>
  );
};