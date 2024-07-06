import { defineEventHandler } from 'h3';
import { deleteTravel } from '../data';

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;

    if (id) {
        await deleteTravel(id);
        return { message: 'Travel deleted successfully' };
    }
    else {
        throw new Error('Travel not found');
    }
});
