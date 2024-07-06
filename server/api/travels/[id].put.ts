import { defineEventHandler, readBody } from 'h3';
import { updateTravel } from '../data';
import type { ITravel } from '~/types/travels/travels.model';

export default defineEventHandler(async (event) => {
    const updatedTravel: ITravel = await readBody(event);
    const id = event.context.params?.id;
    await updateTravel(updatedTravel, id);
    return { message: 'Travel updated successfully' };
});
