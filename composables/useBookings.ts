import { storeToRefs } from 'pinia';
import { useBookingsStore } from '~/stores/bookings.store.js';
import type { IBooking } from '~/types/bookings/bookings.model.js';

export function useBookings() {
    const bookingStore = useBookingsStore();
    const { bookings, loading, selectedBooking } = storeToRefs(bookingStore);

    async function fetchBookings(q?: string) {
        await bookingStore.fetchBookings(q);
    }
    async function fetchBookingDetails(id: string): Promise<void | IBooking> {
        return await bookingStore.fetchBookingDetails(id);
    }

    async function addBooking(booking: Partial<IBooking>) {
        await bookingStore.addBooking(booking);
    }

    async function setSelectedBooking(booking?: IBooking) {
        await bookingStore.setSelectedBooking(booking);
    }

    return {
        bookings,
        loading,
        fetchBookings,
        addBooking,
        setSelectedBooking,
        selectedBooking,
        fetchBookingDetails,
    };
}
