import type { ITravelsStoreState } from '~/types/travels/travels.store.model.js';
import type { ITravel } from '~/types/travels/travels.model.js';
import { travelsService } from '~/services/travels.service';

export const useTravelsStore = defineStore('travels', {
    state: (): ITravelsStoreState => ({
        travels: [],
        error: null,
        loading: false,
    }),
    actions: {
        async fetchTravels(q?: string) {
            this.$state.loading = true;
            try {
                this.travels = await travelsService.fetchTravels(q);
            }
            catch (err) {
                this.$state.error = err as Error;
            }
            finally {
                this.$state.loading = false;
            }
        },
        async addTravel(travel: Partial<ITravel>) {
            this.$state.loading = true;
            try {
                const newTravel = await travelsService.addTravel(travel);
                this.travels.push(newTravel);
            }
            catch (err) {
                this.$state.error = err as Error;
            }
            finally {
                this.$state.loading = false;
            }
        },
        async updateTravel(id: string, updatedTravel: ITravel) {
            this.$state.loading = true;
            try {
                await travelsService.updateTravel(id, updatedTravel);
                const index = this.travels.findIndex(travel => travel.id === id);
                if (index !== -1) {
                    this.travels[index] = { ...this.travels[index], ...updatedTravel };
                }
            }
            catch (err) {
                this.$state.error = err as Error;
            }
            finally {
                this.$state.loading = false;
            }
        },
        async deleteTravel(id: string) {
            this.$state.loading = true;
            try {
                await travelsService.deleteTravel(id);
                this.travels = this.travels.filter(travel => travel.id !== id);
            }
            catch (err) {
                this.$state.error = err as Error;
            }
            finally {
                this.$state.loading = false;
            }
        },
    },
});
