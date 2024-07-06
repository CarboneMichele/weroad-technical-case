import { defineEventHandler, readBody } from 'h3';
import type { ITravel } from './../../types/travels/travels.model';
import { addTravel } from './data';

function getRandomRating(): number {
    const randomNumber = Math.random() * 4 + 1;
    return Number.parseFloat(randomNumber.toFixed(1));
}

export default defineEventHandler(async (event) => {
    const newTravel: Omit<ITravel, 'id'> = await readBody(event);
    const addedTravel: ITravel = addTravel({ ...newTravel, rating: getRandomRating() });
    return { message: 'Travel added successfully', travel: addedTravel };
});
