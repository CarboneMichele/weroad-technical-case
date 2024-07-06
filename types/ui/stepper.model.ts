export interface IStep<T> {
    key: string;
    title: string;
    description: string;
    icon: string;
    hasValidation: boolean;
    formData?: T;
    valid: boolean;
}

export interface IStepComponent {
    submitForm: () => void;
}
