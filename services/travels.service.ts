import type { ITravel } from '~/types/travels/travels.model.js';

class TravelsService {
    async fetchTravels(q?: string): Promise<ITravel[]> {
        return await useCustomFetch().get('/travels', {
            query: { q },
        });
    }

    async fetchTravelDetails(id: string): Promise<ITravel> {
        return await useCustomFetch().get(`/travels/${id}`);
    }

    async addTravel(travel: Omit<ITravel, 'id'>): Promise<ITravel> {
        return await useCustomFetch().post('/travels', travel);
    }

    async updateTravel(id: string, updatedTravel: Partial<ITravel>): Promise<void> {
        await useCustomFetch().put(`/travels/${id}`, updatedTravel);
    }

    async deleteTravel(id: string): Promise<void> {
        await useCustomFetch().del(`/travels/${id}`);
    }
}

export const travelsService = new TravelsService();
