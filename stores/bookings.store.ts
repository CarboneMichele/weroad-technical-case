import type { IBookingsStoreState } from '~/types/bookings/bookings.store.model.js';
import type { IBooking } from '~/types/bookings/bookings.model.js';
import { bookingsService } from '~/services/bookings.service';

export const useBookingsStore = defineStore('bookings', {
    state: (): IBookingsStoreState => ({
        bookings: [],
        selectedBooking: undefined,
        loading: false,
    }),
    actions: {
        async fetchBookings(q?: string): Promise<void> {
            this.setLoading(true);
            try {
                const response = await bookingsService.fetchBookings(q);
                this.$state.bookings = response;
            }

            finally {
                this.setLoading();
            }
        },
        async fetchBookingDetails(id: string): Promise<void | IBooking> {
            this.setLoading(true);
            try {
                const currentBooking = await bookingsService.fetchBookingDetails(id);
                this.setSelectedBooking(currentBooking);
                return currentBooking;
            }
            finally {
                this.setLoading();
            }
        },
        async addBooking(booking: Omit<IBooking, 'id'>): Promise<IBooking | void> {
            this.setLoading(true);
            try {
                const newBooking = await bookingsService.addBooking(booking);
                this.bookings.push(newBooking);
                return newBooking;
            }

            finally {
                this.setLoading();
            }
        },
        setSelectedBooking(booking?: IBooking): void {
            this.$state.selectedBooking = booking;
        },
        setLoading(loading = false): void {
            this.$state.loading = loading;
        },
    },
});
