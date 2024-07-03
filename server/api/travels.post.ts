import { defineEventHandler, readBody } from 'h3';
import type { ITravel } from './../../types/travels/travels.model';
import { addTravel } from './data';

export default defineEventHandler(async (event) => {
    const newTravel: Omit<ITravel, 'id'> = await readBody(event);
    const addedTravel: ITravel = addTravel(newTravel);
    return { message: 'Travel added successfully', travel: addedTravel };
});
