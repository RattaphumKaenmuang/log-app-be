import { Router } from 'express';
import type { Request, Response } from 'express';
import Log from '../models/log.ts';

const router = Router();

/**
 * @swagger
 * /log/get-all-logs:
 *  get:
 *      summary: Get all logs
 *      responses:
 *          200:
 *              description: Returned all logs
 *          500:
 *              description: Internal Server Error
 */
router.get('/get-all-logs', async (req: Request, res: Response) => {
    try {
        const logs = await Log.find();
        res.send(logs);
    } catch (err) {
        res.status(500).json({ error: `Failed to fetch logs: ${err}`})
    }
})

export default router;