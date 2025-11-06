import { Router } from 'express';
import { createLog, getLogs, deleteLog } from '../controllers/log.controller';
import { isAuth } from '../middleware/isAuth';
import { validate } from '../middleware/validate';
import { createLogSchema } from '../dtos/log.dto';

const router = Router();

// --- Log Routes ---
// All routes here are protected by "isAuth" middleware

// POST /api/logs
// Validates body using "createLogSchema" then calls "createLog"
router.post('/', isAuth, validate(createLogSchema), createLog);

// GET /api/logs
// Calls "getLogs"
router.get('/', isAuth, getLogs);

// DELETE /api/logs/:id
// Deletes a specific log
router.delete('/:id', isAuth, deleteLog);

export default router;