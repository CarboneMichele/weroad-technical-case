import { ref } from 'vue';
import type { Ref } from 'vue';
import type { IStep } from '~/types/ui/stepper.model';

interface WizardComposable<T> {
    steps: Ref<IStep<T>[]>;
    currentStep: Ref<number>;
    validate: Ref<boolean>;
    triggerValidation: () => void;
    resetValidation: () => void;
    setValidationStatus: ({ formData, valid }: { formData: T; valid: boolean }) => void;
    handleStepValidation: (stepNumber: number, validationEvent: { formData: T; valid: boolean }) => void;
    nextStep: (skipValidation?: boolean) => void;
    prevStep: () => void;
}

export function useWizard<T>(initialSteps: IStep<T>[]): WizardComposable<T> {
    const steps = ref<IStep<T>[]>(initialSteps);
    const currentStep = ref(0);
    const validate = ref(false);

    function triggerValidation(): void {
        validate.value = true;
    }

    function resetValidation(): void {
        validate.value = false;
    }

    function setValidationStatus({ valid }: { formData: T; valid: boolean }): void {
        resetValidation();
        nextStep(valid);
    }

    function handleStepValidation(stepNumber: number, validationEvent: { formData: T; valid: boolean }): void {
        setValidationStatus(validationEvent);
        populateStepFormField(validationEvent.formData, stepNumber);
    }

    function populateStepFormField(formData: T, stepNumber: number): void {
        (steps.value[stepNumber].formData as T) = formData;
    }

    function nextStep(skipValidation?: boolean) {
        if (steps.value[currentStep.value].hasValidation) {
            if (skipValidation) {
                currentStep.value++;
            }
            else {
                triggerValidation();
            }
        }
        else {
            if (currentStep.value < steps.value.length - 1) {
                currentStep.value++;
            }
        }
    }

    function prevStep() {
        if (currentStep.value > 0) {
            resetValidation();
            currentStep.value--;
        }
    }

    return {
        steps,
        currentStep,
        validate,
        triggerValidation,
        resetValidation,
        setValidationStatus,
        handleStepValidation,
        nextStep,
        prevStep,
    };
}
