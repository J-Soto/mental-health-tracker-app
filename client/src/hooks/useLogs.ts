import { useSocket } from './useSocket';
import { useCallback } from 'react';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient, QueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import api from '../services/api';

const scaleSchema = z.number().int().min(1).max(5);

const LogSchema = z.object({
  id: z.string(),
  userId: z.string(),
  date: z.string(),
  mood: scaleSchema,
  anxiety: scaleSchema,
  stress: scaleSchema,
  sleepQuality: scaleSchema,
  sleep: z.number().min(0).max(24),
  socialInteractions: z.number().int().min(0),
  physicalActivity: z.string().nullable(),
  sleepDisturbances: z.string().nullable(),
  symptoms: z.string().nullable(),
});

export type LogEntry = z.infer<typeof LogSchema>;

const CreateLogInputSchema = z.object({
  date: z.string().optional(),
  mood: scaleSchema,
  anxiety: scaleSchema,
  stress: scaleSchema,
  sleepQuality: scaleSchema,
  sleep: z.number().min(0).max(24),
  socialInteractions: z.number().int().min(0),
  physicalActivity: z.string().nullable(),
  sleepDisturbances: z.string().nullable(),
  symptoms: z.string().nullable(),
});

export type CreateLogFormInput = z.infer<typeof CreateLogInputSchema>;

/**
 * Hook to manage logs fetching, creation, and caching.
 * Uses React Query for server state management.
 */
export const useLogs = () => {
  const queryClient = useQueryClient();

  const { data: logs, isLoading, error } = useQuery({
    queryKey: ['logs'],
    queryFn: async () => {
      const response = await api.get('/logs');
      return z.array(LogSchema).parse(response.data);
    },
    enabled: true,
  });

  const createLogMutation = useMutation({
    mutationFn: async (newLogData: CreateLogFormInput) => {
      const sanitizedData = {
        ...newLogData,
        physicalActivity: newLogData.physicalActivity || '',
        sleepDisturbances: newLogData.sleepDisturbances || '',
        symptoms: newLogData.symptoms || '',
      };
      
      const response = await api.post('/logs', sanitizedData);
      return response.data;
    },
    onSuccess: (newLog) => {
      queryClient.invalidateQueries({ queryKey: ['logs'] });
    },
  });

  const deleteLogMutation = useMutation({
    mutationFn: async (logId: string) => {
      await api.delete(`/logs/${logId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logs'] });
    },
  });
  
  const handleNewLog = useCallback(() => {
    console.log('📥 WebSocket: New log received, invalidating cache...');
    queryClient.invalidateQueries({ queryKey: ['logs'] });
  }, [queryClient]);

  useSocket('newLog', handleNewLog);

  const handleLogDeleted = useCallback(() => {
    console.log('📥 WebSocket: Log deleted, invalidating cache...');
    queryClient.invalidateQueries({ queryKey: ['logs'] });
  }, [queryClient]);

  useSocket('logDeleted', handleLogDeleted);

  return {
    logs: logs || [],
    isLoading: isLoading,
    error,
    createLogMutation,
    deleteLogMutation,
  };
};