import { storeToRefs } from 'pinia';
import { useTravelsStore } from '~/stores/travels.store.js';
import type { ITravel } from '~/types/travels/travels.model.js';

export function useTravels() {
    const travelStore = useTravelsStore();
    const { travels, error, loading } = storeToRefs(travelStore);

    async function fetchTravels(q?: string) {
        await travelStore.fetchTravels(q);
    }

    async function addTravel(travel: Partial<ITravel>) {
        await travelStore.addTravel(travel);
    }

    async function updateTravel(id: string, updatedTravel: ITravel) {
        await travelStore.updateTravel(id, updatedTravel);
    }

    async function deleteTravel(id: string) {
        await travelStore.deleteTravel(id);
    }

    return {
        travels,
        error,
        loading,
        fetchTravels,
        addTravel,
        updateTravel,
        deleteTravel,
    };
}
