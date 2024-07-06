import type { ITravel } from '../travels/travels.model';

export interface IBooking {
    id: string;
    customer: ICustomerInfo;
    payment: IPaymentOption;
    notes: string;
    travel: ITravel;
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

export enum IPaymentOption {
    PAYPAL = 'PAYPAL',
    REVOLUT = 'REVOLUT',
    CREDIT = 'CREDIT',
}

export interface IPaymentOptionsFormModel {
    option: IPaymentOption;
    notes: string;
}

export type TCustomerWizardForm = ITravel | ICustomerInfo | IPaymentOption | IPaymentOptionsFormModel | null;
