import { defineEventHandler } from 'h3';
import { deleteTravel } from './data';

export default defineEventHandler((event) => {
    const id = event.context.params?.id;

    if (id) {
        deleteTravel(id);
        return { message: 'Travel deleted successfully' };
    }
    else {
        throw new Error('Travel not found');
    }
});
