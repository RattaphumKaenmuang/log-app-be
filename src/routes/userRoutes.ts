import { Router } from 'express'
import type { Request, Response } from 'express'
import User from '../models/user.ts'

const router = Router();

/** 
 * @swagger
 * /get-all-users:
 *  get:
 *      summary: Get all users
 *      responses:
 *          200:
 *              description: Returns all users
 *          500:
 *              description: Internal Server Error
 * 
*/
router.get('/get-all-users', async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch users: ${error}`})
    }
})

export default router;