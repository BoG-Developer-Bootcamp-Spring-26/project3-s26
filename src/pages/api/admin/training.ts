
import type {NextApiRequest, NextApiResponse} from 'next';
import { getAllTrainingLogs } from "../../../../server/mongodb/actions/trainingLogs"
import { TrainingLogData } from "../../../types/types"
import { connectDb } from "../../../../server/mongodb/connectDb"

type TrainingLogsData = {
    traininglogs?: TrainingLogData[];
    message: string;
}

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse<TrainingLogsData>) {
    if (req.method === 'GET') {
        try {
            // pagination: cursor is the _id of the traininglog in the page before this
            // limit is limit for how many traininglogs you want to fetch
            const { cursor, limit } = req.query;

            if (!cursor || Array.isArray(cursor)) {
                return res.status(500).json({ 
                    message: 'Cursor is required for pagination to get all trainings!' 
                });
            }

            const limitNum = Number(limit);
            if (isNaN(limitNum)) {
                return res.status(500).json({ 
                    message: 'Limit must be a number and is required for pagination to get all trainings!' 
                });
            }

            const traininglogs = await getAllTrainingLogs(cursor, limitNum);
            res.status(200).json({
                traininglogs: traininglogs,
                message: `Successfully fetched data for all trainings!`
            }); // 200 : working as intended, the Good response
        } catch(e) {
            res.status(500).json({
                message: `An error occurred while fetching the data of all trainings. ${e}`
            })
        }
    } else {
        res.status(500).json({
            message: "Method not allowed. Only GET requests are supported."
        });
    }
}

connectDb();