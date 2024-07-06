import { defineEventHandler } from 'h3';
import { getTravels } from './data';
import type { ITravel } from '~/types/travels/travels.model';

export default defineEventHandler(async (event) => {
    const { q } = getQuery(event);

    try {
        let filteredTravels = await getTravels();

        if (q) {
            filteredTravels = filteredTravels.filter((travel: ITravel) => {
                return Object.values(travel).some((value) => {
                    return String(value).toLowerCase().includes((q as string).toLowerCase());
                });
            });
        }

        return filteredTravels;
    }
    catch (error) {
        console.error('Error fetching and filtering travels:', error);
        throw error;
    }
});
