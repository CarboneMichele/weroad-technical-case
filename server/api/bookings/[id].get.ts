import { defineEventHandler } from 'h3';

import { getBookingById } from '../data';

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id as string;
    try {
        const booking = await getBookingById(id);

        if (!booking) {
            throw new Error(`Booking with ID ${id} not found`);
        }

        return booking;
    }
    catch (error) {
        console.error(`Error fetching booking with ID ${id}:`, error);
        throw error;
    }
});
