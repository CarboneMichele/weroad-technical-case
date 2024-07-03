import { defineEventHandler } from 'h3';

import { getTravelById } from '../data';

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id as string;
    try {
        const travel = await getTravelById(id);

        if (!travel) {
            throw new Error(`Travel with ID ${id} not found`);
        }

        return travel;
    }
    catch (error) {
        console.error(`Error fetching travel with ID ${id}:`, error);
        throw error;
    }
});
