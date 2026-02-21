import { Router } from 'express';
import type { Request, Response } from 'express';
import Log from '../models/log.ts';
import { Paginator } from '../utils/pagination.ts';
import mongoose from 'mongoose';

const router = Router();

// /**
//  * @swagger
//  * /log/get-all-logs:
//  *  get:
//  *      summary: Get all logs
//  *      responses:
//  *          200:
//  *              description: Returned all logs
//  *          500:
//  *              description: Internal Server Error
//  */
// router.get('/get-all-logs', async (req: Request, res: Response) => {
//     try {
//         const logs = await Log.find();
//         res.send(logs);
//     } catch (err) {
//         res.status(500).json({ error: `Failed to fetch logs: ${err}`})
//     }
// })

/**
 * @swagger
 * /log/get-paginated-logs:
 *  get:
 *      summary: Get paginated logs
 *      parameters:
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *        - in: query
 *          name: sortBy
 *          schema:
 *            type: string
 *        - in: query
 *          name: order
 *          schema:
 *            type: string
 *            enum: [asc, desc]
 *        - in: query
 *          name: actions
 *          schema:
 *            type: array
 *            items:
 *              type: string
 *        - in: query
 *          name: startDate
 *          schema:
 *            type: string
 *        - in: query
 *          name: endDate
 *          schema:
 *            type: string
 *        - in: query
 *          name: userCodes
 *          schema:
 *            type: array
 *            items:
 *              type: string
 *        - in: query
 *          name: statusCodes
 *          schema:
 *            type: array
 *            items:
 *              type: integer
 *        - in: query
 *          name: labnumbers
 *          schema:
 *            type: array
 *            items:
 *              type: string
 *        - in: query
 *          name: lowerResTime
 *          schema:
 *            type: string
 *        - in : query
 *          name: upperResTime
 *          schema:
 *            type: string
 *      responses:
 *          200:
 *              description: Returns paginated logs
 *          500:
 *              description: Internal Server Error
 */
router.get('/get-paginated-logs', async (req: Request, res: Response) => {
    try {
        const logPaginator = new Paginator(Log);

        let page = parseInt(req.query.page as string, 10);
        let limit = parseInt(req.query.limit as string, 10);
        let sortBy = req.query.sortBy as string;
        let order = req.query.order as 'asc' | 'desc';

        let actions = toArray(req.query.actions as string[]);
        let userCodes = toArray(req.query.userCodes as string[]);
        let statusCodes = toArray(req.query.statusCodes as string[]);
        let labnumbers = toArray(req.query.labnumbers as string[]);

        let lowerResTime = req.query.lowerResTime ? parseInt(req.query.lowerResTime as string, 10) : undefined;
        let upperResTime = req.query.upperResTime ? parseInt(req.query.upperResTime as string, 10) : undefined;

        let startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
        let endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;
        
        const filter: Record<string, any> = {};

        if (actions && actions.length > 0) {
            filter.action = { $in: actions };
        }

        if (userCodes && userCodes.length > 0) {
            const objectIds = userCodes.map(id => new mongoose.Types.ObjectId(id));
            filter.userId = { $in: objectIds };
        }

        if (statusCodes && statusCodes.length > 0) {
            filter['response.statusCode'] = { $in: statusCodes }
        }

        if (labnumbers && labnumbers.length > 0) {
            filter.labnumber = { $in: labnumbers };
        }

        if (startDate && endDate) {
            filter.timestamp = {
                $gte: startDate,
                $lte: endDate
            };
        }

        if (lowerResTime && upperResTime) {
            filter['response.timeMs'] = {
                $gte: lowerResTime,
                $lte: upperResTime
            }
        }

        const result = await logPaginator.paginate(filter, {
            page: page,
            limit: limit,
            sortBy: sortBy,
            order: order,
            populate: {
                path: 'userId',
                select: 'prefix firstname lastname'
            }
        });

        res.send(result);
        
    } catch (err) {
        res.status(500).json({ error: `Failed to fetch logs: ${err}` });
    }
})

function toArray(data: any){
    if (!data) return [];
    else if (!Array.isArray(data)) {
        return [data];
    }
    return data
}

export default router;