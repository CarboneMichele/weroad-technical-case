export interface IBooking {
    id: string;
}

export interface ICustomerInfo {
    firstName: string;
    lastName: string;
    age: number | null;
    phone: number | null;
    gender: IGender | null;
    email: string;
}

export enum IGender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
}
