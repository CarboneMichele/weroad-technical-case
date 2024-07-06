import type { IBooking } from '~/types/bookings/bookings.model.js';

class BookingsService {
    async fetchBookings(q?: string): Promise<IBooking[]> {
        return await useCustomFetch().get('/bookings', {
            query: { q },
        });
    }

    async fetchBookingDetails(id: string): Promise<IBooking> {
        return await useCustomFetch().get(`/bookings/${id}`);
    }

    async addBooking(booking: Omit<IBooking, 'id'>): Promise<IBooking> {
        return await useCustomFetch().post('/bookings', booking);
    }
}

export const bookingsService = new BookingsService();
