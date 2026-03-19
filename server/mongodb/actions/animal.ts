import { AnimalData } from "../types/types";
import Animal from "../models/Animal";

export async function createAnimal(animalData: AnimalData) {
  const newAnimal = new Animal(animalData);
  await newAnimal.save();
  return newAnimal;
}

export async function getAnimal(animalId: string) {
  const retrievedAnimal = await Animal.findById(animalId);
  return retrievedAnimal;
}

export async function updateAnimal(animalId: string, newData: AnimalData) {
  const updatedAnimal = await Animal.findByIdAndUpdate(animalId, newData, { new: true });
  return updatedAnimal;
}

export async function deleteAnimal(animalId: string) {
  await Animal.findByIdAndDelete(animalId);
}
