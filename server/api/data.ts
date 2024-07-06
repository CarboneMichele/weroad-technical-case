// server/data.ts
import { v4 as uuidv4 } from 'uuid';
import type { ITravel } from '../../types/travels/travels.model';
import type { IBooking } from '~/types/bookings/bookings.model';

function delay(milliseconds: number = 1000): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}

// TRAVELS
let travels: ITravel[] = [
    // {
    //     name: 'Default Travel',
    //     departureDate: '2024-07-05T10:05:44.509Z',
    //     returnDate: '2024-07-06T10:05:44.509Z',
    //     picture: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
    //     description: 'desc',
    //     price: 1230,
    //     rating: 3.2,
    //     id: '9fa6fc23-101a-467b-83a7-301fc611e151',
    // },
];

export async function getTravels(): Promise<ITravel[]> {
    await delay(1000);
    return travels;
};

export async function getTravelById(id: string): Promise<ITravel | undefined> {
    const allTravels = await getTravels();
    await delay(1000);
    return allTravels.find(travel => travel.id === id);
}

export function addTravel(travel: Omit<ITravel, 'id'>) {
    const newTravel = { ...travel, id: uuidv4() };
    travels.push(newTravel);
    return newTravel;
}

export async function updateTravel(updatedTravel: ITravel, id?: string) {
    await delay(1000);
    if (!id) {
        return;
    }
    travels = travels.map(travel => (travel.id === id ? { ...updatedTravel, id } : travel));
}

export async function deleteTravel(id: string) {
    await delay(1000);
    travels = travels.filter(travel => travel.id !== id);
}

// BOOKINGS

const bookings: IBooking[] = [];

export async function getBookings(): Promise<IBooking[]> {
    await delay(1000);
    return bookings;
};

export async function getBookingById(id: string): Promise<IBooking | undefined> {
    const allBookings = await getBookings();
    await delay(1000);
    return allBookings.find(bookings => bookings.id === id);
}

export async function addBooking(booking: Omit<IBooking, 'id'>) {
    await delay(1000);
    const newBooking = { ...booking, id: uuidv4() };
    bookings.push(newBooking);
    return newBooking;
}
