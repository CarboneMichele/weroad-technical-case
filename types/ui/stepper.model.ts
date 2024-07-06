export interface IStep {
    key: string;
    title: string;
    description: string;
    icon: string;
    hasValidation: boolean;
    formData?: any;
    valid: boolean;
}

export interface IStepComponent {
    submitForm: () => void;
}
