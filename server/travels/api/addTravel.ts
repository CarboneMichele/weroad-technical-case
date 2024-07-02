import { defineEventHandler, readBody } from 'h3';
import { addTravel } from '../../api/data';
import type { ITravel } from '../../../types/travels.model';

export default defineEventHandler(async (event) => {
    const newTravel: Omit<ITravel, 'id'> = await readBody(event);
    const addedTravel = addTravel(newTravel);
    return { message: 'Travel added successfully', travel: addedTravel };
});
