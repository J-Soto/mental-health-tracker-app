import { Request, Response } from 'express';
import { createLogForUser, findLogsByUser, deleteLogById } from '../services/log.service';
import { Server as SocketIOServer } from 'socket.io';

/**
 * Controller to create a new log entry
 */
export const createLog = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const logData = req.body;

    const newLog = await createLogForUser(userId, logData);

    const io: SocketIOServer = req.app.get('io');
    if (io) {
      io.to(userId).emit('newLog', newLog);
      console.log(`📤 WebSocket: Event 'newLog' emitted to user ${userId}`);
    }

    res.status(201).json(newLog);
  } catch (error) {
    console.error('Error creating log:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Controller to get all logs for a user
 */
export const getLogs = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const logs = await findLogsByUser(userId);
    res.status(200).json(logs);
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Controller to delete a specific log
 */
export const deleteLog = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const logId = req.params.id;

    await deleteLogById(logId, userId);

    const io: SocketIOServer = req.app.get('io');
    if (io) {
      io.to(userId).emit('logDeleted', { logId });
      console.log(`📤 WebSocket: Event 'logDeleted' emitted to user ${userId}`);
    }

    res.status(200).json({ message: 'Log deleted successfully' });
  } catch (error) {
    console.error('Error deleting log:', error);
    if (error instanceof Error && error.message.includes('not found')) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};