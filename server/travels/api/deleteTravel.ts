import { defineEventHandler } from 'h3';
import { deleteTravel } from '../../api/data';

export default defineEventHandler((event) => {
    const id = event.context.params?.id;
    deleteTravel(id);
    return { message: 'Travel deleted successfully' };
});
