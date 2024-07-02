import { ref } from 'vue';
import type { ITravel } from '~/types/travels.model';

export function useTravels() {
    const travels = ref<ITravel[]>([]);
    const error = ref<Error | null | unknown>(null);

    async function fetchTravels(): Promise<void> {
        try {
            const response: Response = await fetch('/api/travels');
            travels.value = await response.json();
        }
        catch (err) {
            error.value = err;
        }
    }

    async function addTravel(travel: ITravel): Promise<void> {
        try {
            const response: Response = await fetch('/api/addTravel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(travel),
            });
            const newTravel: { travel: ITravel } = await response.json();
            travels.value.push(newTravel.travel);
        }
        catch (err) {
            error.value = err;
        }
    }

    async function updateTravel(id: string, updatedTravel: ITravel): Promise<void> {
        try {
            await fetch(`/api/updateTravel/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTravel),
            });
            const index: number = travels.value.findIndex((travel: ITravel) => travel.id === id);
            if (index !== -1) {
                travels.value[index] = { ...travels.value[index], ...updatedTravel };
            }
        }
        catch (err) {
            error.value = err;
        }
    }

    async function deleteTravel(id: string): Promise<void> {
        try {
            await fetch(`/api/deleteTravel/${id}`, {
                method: 'DELETE',
            });
            travels.value = travels.value.filter((travel: ITravel) => travel.id !== id);
        }
        catch (err) {
            error.value = err;
        }
    }

    return {
        travels,
        error,
        fetchTravels,
        addTravel,
        updateTravel,
        deleteTravel,
    };
}
