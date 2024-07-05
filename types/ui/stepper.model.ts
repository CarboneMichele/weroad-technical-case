export interface IStep {
    key: string;
    title: string;
    description: string;
    icon: string;
    hasValidation: boolean;
    formData?: Record<string, any>;
    valid: boolean;
}
