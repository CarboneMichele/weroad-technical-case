import { defineEventHandler, readBody } from 'h3';
import type { ITravel } from '../../types/travels/travels.model';
import { updateTravel } from './data';

export default defineEventHandler(async (event) => {
    const updatedTravel: ITravel = await readBody(event);
    const id = event.context.params?.id;
    updateTravel(updatedTravel, id);
    return { message: 'Travel updated successfully' };
});
