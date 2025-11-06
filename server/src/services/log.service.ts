import prisma  from '../config/prisma';
import { CreateLogDto } from '../dtos/log.dto';

/**
 * Service to create a new log entry for a specific user
 */
export const createLogForUser = async (
  userId: string,
  logData: CreateLogDto
) => {
  const { date, ...restLogData } = logData;
  
  const logDate = date ? new Date(date) : new Date();
  const fullDateTime = logDate.toISOString();
  
  return await prisma.dailyLog.create({
    data: {
      ...restLogData,
      userId: userId,
      date: fullDateTime,
    },
  });
};

/**
 * Service to find all logs for a user,
 * sorted by date descending (newest first).
 */
export const findLogsByUser = async (userId: string) => {
  const logs = await prisma.dailyLog.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      date: 'desc',
    },
  });
  return logs;
};

/**
 * Service to delete a specific log for a user
 */
export const deleteLogById = async (logId: string, userId: string) => {
  const log = await prisma.dailyLog.findFirst({
    where: {
      id: logId,
      userId: userId,
    },
  });

  if (!log) {
    throw new Error('Log not found or you do not have permission to delete it');
  }

  return await prisma.dailyLog.delete({
    where: {
      id: logId,
    },
  });
};