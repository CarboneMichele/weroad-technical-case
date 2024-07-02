// server/data.ts
import { v4 as uuidv4 } from 'uuid';
import type { ITravel } from '../../types/travels.model';

let travels: ITravel[] = [
    {
        id: '1',
        name: 'Viaggio a Parigi',
        departureDate: '2024-08-01',
        returnDate: '2024-08-10',
        picture: 'url_dell_immagine',
        description: 'Descrizione del tour a Parigi',
        price: 1200,
        rating: 4.7,
    },
    {
        id: '2',
        name: 'Viaggio a New York',
        departureDate: '2024-09-15',
        returnDate: '2024-09-25',
        picture: 'url_dell_immagine',
        description: 'Descrizione del tour a New York',
        price: 2000,
        rating: 4.9,
    },
];

export const getTravels = () => travels;

export function addTravel(travel: Omit<ITravel, 'id'>) {
    const newTravel = { ...travel, id: uuidv4() };
    travels.push(newTravel);
    return newTravel;
}

export function updateTravel(updatedTravel: ITravel, id?: string) {
    if (!id) {
        return;
    }
    travels = travels.map(travel => (travel.id === id ? { ...updatedTravel, id } : travel));
}

export function deleteTravel(id: string) {
    travels = travels.filter(travel => travel.id !== id);
}
