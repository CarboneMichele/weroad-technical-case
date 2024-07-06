import { defineEventHandler, readBody } from 'h3';
import { addBooking } from './data';
import type { IBooking } from '~/types/bookings/bookings.model';

export default defineEventHandler(async (event) => {
    const newBooking: Omit<IBooking, 'id'> = await readBody(event);
    const addedBooking: IBooking = await addBooking({ ...newBooking });
    return { message: 'Booking added successfully', booking: addedBooking };
});
