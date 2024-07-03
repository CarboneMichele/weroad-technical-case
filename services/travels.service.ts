// services/travelService.ts
import type { ITravel } from '~/types/travels/travels.model.js';

class TravelsService {
    async fetchTravels(q?: string): Promise<ITravel[]> {
        return await $fetch('/api/travels', {
            query: { q },
        });
    }

    async fetchTravelDetails(id: string): Promise<ITravel> {
        return await $fetch(`/api/travels/${id}`);
    }

    async addTravel(travel: Partial<ITravel>): Promise<ITravel> {
        return await $fetch('/api/travels', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: travel,
        });
    }

    async updateTravel(id: string, updatedTravel: Partial<ITravel>): Promise<void> {
        await $fetch(`/api/travels/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: updatedTravel,
        });
    }

    async deleteTravel(id: string): Promise<void> {
        await $fetch(`/api/travels/${id}`, {
            method: 'DELETE',
        });
    }
}

export const travelsService = new TravelsService();
