import type { ITravelsStoreState } from '~/types/travels/travels.store.model.js';
import type { ITravel } from '~/types/travels/travels.model.js';
import { travelsService } from '~/services/travels.service';

export const useTravelsStore = defineStore('travels', {
    state: (): ITravelsStoreState => ({
        travels: [],
        selectedTravel: undefined,
        loading: false,
    }),
    actions: {
        async fetchTravels(q?: string): Promise<void> {
            this.setLoading(true);
            try {
                const response = await travelsService.fetchTravels(q);
                this.$state.travels = response;
            }

            finally {
                this.setLoading();
            }
        },
        async fetchTravelDetails(id: string): Promise<void | ITravel> {
            this.setLoading(true);
            try {
                const currentTravel = await travelsService.fetchTravelDetails(id);
                this.setSelectedTravel(currentTravel);
                return currentTravel;
            }
            finally {
                this.setLoading();
            }
        },
        async addTravel(travel: Partial<ITravel>): Promise<void> {
            this.setLoading(true);
            try {
                const newTravel = await travelsService.addTravel(travel);
                this.travels.push(newTravel);
            }

            finally {
                this.setLoading();
            }
        },
        async updateTravel(id: string, updatedTravel: Partial<ITravel>): Promise<void> {
            this.setLoading(true);
            try {
                await travelsService.updateTravel(id, updatedTravel);
                const index = this.travels.findIndex(travel => travel.id === id);
                if (index !== -1) {
                    this.travels[index] = { ...this.travels[index], ...updatedTravel };
                }
            }

            finally {
                this.setLoading();
            }
        },
        async deleteTravel(id: string): Promise<void> {
            this.setLoading(true);
            try {
                await travelsService.deleteTravel(id);
                this.travels = this.travels.filter(travel => travel.id !== id);
            }

            finally {
                this.setLoading();
            }
        },
        setSelectedTravel(travel?: ITravel): void {
            this.$state.selectedTravel = travel;
        },
        setLoading(loading = false): void {
            this.$state.loading = loading;
        },
    },
});
