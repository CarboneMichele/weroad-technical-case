// server/data.ts
import { v4 as uuidv4 } from 'uuid';
import type { ITravel } from '../../types/travels/travels.model';

let travels: ITravel[] = [

];

function delay(milliseconds: number = 1000): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}

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
