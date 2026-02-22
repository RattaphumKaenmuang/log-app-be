import { Router } from 'express'
import type { Request, Response } from 'express'
import User from '../models/user.js'

const router = Router();

/** 
 * @swagger
 * /api/user/get-all-users:
 *  get:
 *      summary: Get all users
 *      responses:
 *          200:
 *              description: Returned all users
 *          500:
 *              description: Internal Server Error
 * 
*/
router.get('/get-all-users', async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: `Failed to fetch users: ${err}`});
    }
})

/**
 * @swagger
 * /api/user/get-all-existing-users:
 *  get:
 *      summary: Get all users whose isDel is false
 *      responses:
 *          200:
 *              description: Returned all users with isDel == false
 *          500:
 *              description: Internal Server Error
 */
router.get('/get-all-existing-users', async (req: Request, res: Response) => {
    try {
        let filter = {isDel: false};
        const users = await User.find(filter);
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: `Failed to fetch users: ${err}` });
    }
})

export default router;