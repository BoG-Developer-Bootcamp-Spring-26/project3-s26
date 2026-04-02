import type { NextApiRequest, NextApiResponse } from "next";
import { AnimalData } from "@/types/types";
import { getUser } from "../../../../server/mongodb/actions/user";
import { createAnimal, deleteAnimal, updateAnimal, getAnimal} from "../../../../server/mongodb/actions/animal";
import connectDb from "../../../../server/mongodb/connectDb";

interface AnimalApiData {
    animalData? : AnimalData;
    message: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AnimalApiData>,
) {
    if(req.method === 'POST') {
        try {
            if (!req.body.name || !req.body.breed || !req.body.owner || !req.body.hoursTrained) {
                res.status(500).json({
                    message: "All information must be given to create an animal"
                });
            }

            const animalData = {
                name: req.body.name,
                breed: req.body.breed, 
                owner: req.body.owner,
                hoursTrained: req.body.hoursTrained,
            } as AnimalData

            await connectDb();
            const owner = await getUser(req.body.owner);
            if (!owner) {
                res.status(400).json({
                    message: "Owner of animal does not exist in database"
                });
            }
            
            const animal = await createAnimal(animalData);
            res.status(200).json({
                animalData: animalData,
                message: "Animal creation succseful"
            });
        } catch (e) {
            res.status(500).json({
                message: "There was an error in adding the animal to the database"
            });
        }
    } else if (req.method === "PATCH") {
        try {
            if (!req.body._id) {
                res.status(400).json({
                    message: "No animal id given"
                });
            };
            const {_id, ...updateData} = req.body;
            await connectDb();
            const updatedAnimal = await updateAnimal(_id, updateData);
            if (!updatedAnimal) {
                res.status(500).json({
                    message: "Failed to update animal"
                });
            }

            res.status(200).json({
                animalData: updatedAnimal as unknown as AnimalData,
                message: "Succesfully update animal"
            });

        } catch (e) {
            res.status(500).json({
                message: "Failed to update animal"
            });
        }
    }

}