import { z } from 'zod';

export const createLogSchema = z.object({
  date: z.string().optional(),
  mood: z.number().int().min(1).max(5),
  anxiety: z.number().int().min(1).max(5),
  stress: z.number().int().min(1).max(5),
  sleepQuality: z.number().int().min(1).max(5),
  sleep: z.number().min(0).max(24),
  socialInteractions: z.number().int().min(0),
  physicalActivity: z.string().optional().nullable(),
  sleepDisturbances: z.string().optional().nullable(),
  symptoms: z.string().optional().nullable(),
});

export type CreateLogDto = z.infer<typeof createLogSchema>;