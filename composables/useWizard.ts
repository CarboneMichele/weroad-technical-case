import type { IStep, IStepComponent } from '~/types/ui/stepper.model';

export function useWizard(initialSteps: IStep[]) {
    const stepsArray = ref<IStep[]>(initialSteps);
    const stepsMap = ref(new Map<string, IStep>());

    const currentStepKey = ref<string>(stepsArray.value[0].key);
    const currentStepRef = ref<IStepComponent | null>(null);

    // Populate stepsMap from stepsArray
    function populateStepsMap(): void {
        stepsMap.value.clear();
        stepsArray.value.forEach((step: IStep) => {
            stepsMap.value.set(step.key, step);
        });
    }

    populateStepsMap();

    function handleStepValidation(stepKey: string, validationEvent: { formData: any; valid: boolean }): void {
        populateStepFormField(validationEvent.formData, stepKey);

        const step = stepsMap.value.get(stepKey);
        if (step) {
            step.valid = validationEvent.valid;
            if (validationEvent.valid) {
                goNext();
            }
        }
    }

    function populateStepFormField(formData: any, stepKey: string): void {
        const step = stepsMap.value.get(stepKey);
        if (step) {
            step.formData = formData;
        }
    }

    function onNextStepClick() {
        const currentStep = stepsMap.value.get(currentStepKey.value);
        if (currentStep && currentStep.hasValidation) {
            // validate
            if (currentStepRef.value) {
                currentStepRef.value.submitForm();
            }
        }
        else {
            goNext();
        }
    }

    function onPrevStepClick() {
        const stepKeys = Array.from(stepsMap.value.keys());
        const currentIndex = stepKeys.indexOf(currentStepKey.value);
        if (currentIndex > 0) {
            currentStepKey.value = stepKeys[currentIndex - 1];
        }
    }

    function goNext() {
        const stepKeys = Array.from(stepsMap.value.keys());
        const currentIndex = stepKeys.indexOf(currentStepKey.value);
        if (currentIndex < stepKeys.length - 1) {
            currentStepKey.value = stepKeys[currentIndex + 1];
        }
    }

    function getStepFormData<T>(stepKey: string): T {
        return stepsMap.value.get(stepKey)?.formData || null;
    }

    const currentStepIndex = computed(() => {
        const stepKeys = Array.from(stepsMap.value.keys());
        return stepKeys.indexOf(currentStepKey.value);
    });

    return {
        stepsArray,
        currentStepKey,
        currentStepRef,
        handleStepValidation,
        onNextStepClick,
        onPrevStepClick,
        goNext,
        getStepFormData,
        currentStepIndex,
    };
}
