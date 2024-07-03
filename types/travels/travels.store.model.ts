import type { ITravel } from './travels.model';

export interface ITravelsStoreState {
    travels: ITravel[];
    selectedTravel?: ITravel ;
    error: Error | null;
    loading: boolean;
}
