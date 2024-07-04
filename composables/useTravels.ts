import { storeToRefs } from 'pinia';
import { useTravelsStore } from '~/stores/travels.store.js';
import type { ITravel } from '~/types/travels/travels.model.js';

export function useTravels() {
    const travelStore = useTravelsStore();
    const { travels, loading, selectedTravel } = storeToRefs(travelStore);

    async function fetchTravels(q?: string) {
        await travelStore.fetchTravels(q);
    }
    async function fetchTravelDetails(id: string): Promise<void | ITravel> {
        return await travelStore.fetchTravelDetails(id);
    }

    async function addTravel(travel: Partial<ITravel>) {
        await travelStore.addTravel(travel);
    }

    async function updateTravel(id: string, updatedTravel: Partial<ITravel>) {
        await travelStore.updateTravel(id, updatedTravel);
    }

    async function deleteTravel(id: string) {
        await travelStore.deleteTravel(id);
    }

    async function setSelectedTravel(travel?: ITravel) {
        await travelStore.setSelectedTravel(travel);
    }

    return {
        travels,
        loading,
        fetchTravels,
        addTravel,
        updateTravel,
        deleteTravel,
        setSelectedTravel,
        selectedTravel,
        fetchTravelDetails,
    };
}
