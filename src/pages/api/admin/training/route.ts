import type { NextApiRequest, NextApiResponse } from "next";
import { getAllLogs } from "../../../../../server/mongodb/actions/training"; 
import connectDb from "../../../../../server/mongodb/connectDb";

interface TrainingApiData{
    logs?: any[];
    message: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<TrainingApiData>
) {
    if (req.method === 'GET') {
        try {
            await connectDb();
            const logs = await getAllLogs();
            if (!logs || logs.length === 0) {
                res.status(500).json({
                    message: "There are no logs to return"
                });
            }

            res.status(200).json({
                logs: logs,
                message: "Succesfully retrieved all logs"
            });
            
        } catch (e) {
            res.status(500).json({
                message: "There was an error in getting the training logs"
            });
        }
    }

}
