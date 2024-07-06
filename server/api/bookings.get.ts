import { defineEventHandler } from 'h3';
import { getBookings } from './data';
import type { IBooking } from '~/types/bookings/bookings.model';

export default defineEventHandler(async (event) => {
    const { q } = getQuery(event);

    try {
        let filteredBookings = await getBookings();

        if (q) {
            filteredBookings = filteredBookings.filter((booking: IBooking) => {
                return Object.values(booking).some((value) => {
                    return String(value).toLowerCase().includes((q as string).toLowerCase());
                });
            });
        }

        return filteredBookings;
    }
    catch (error) {
        console.error('Error fetching and filtering bookings:', error);
        throw error;
    }
});
