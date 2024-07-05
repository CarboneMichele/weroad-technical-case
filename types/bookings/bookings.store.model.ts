import type { IBooking } from './bookings.model';

export interface IBookingsStoreState {
    bookings: IBooking[];
    selectedBooking?: IBooking ;
    loading: boolean;
}
