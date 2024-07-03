import type { ITravel } from './travels.model';

export interface ITravelsStoreState {
    travels: ITravel[];
    error: Error | null;
    loading: boolean;
}
