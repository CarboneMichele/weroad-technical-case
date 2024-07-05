<!-- pages/index.vue -->
<script setup lang="ts">
import { ref } from 'vue';
import type { IStep } from '~/types/ui/stepper.model';

const { t } = useI18n();

const steps = computed<IStep[]>(() => {
    return [
        {
            key: 'travel',
            title: t('PROJECT_COMMON.S01', 1),
            description: t('TRAVELS.S08'),
            icon: 'rocket-launch',
            hasValidation: true,
            formData: {},
            valid: false,
            error: '',
        },
        {
            key: 'customer',
            title: t('PROJECT_COMMON.S06', 1),
            description: t('PROJECT_COMMON.S07'),
            icon: 'user',
            hasValidation: true,
            formData: {},
            valid: false,
            error: '',
        },
        {
            key: 'payment',
            title: t('BOOKINGS.S05', 1),
            description: t('BOOKINGS.S06'),
            icon: 'credit-card',
            hasValidation: true,
            formData: {},
            valid: false,
            error: '',
        },

    ];
});

const currentStep = ref(0);
const validate = ref(false);

function triggerValidation(): void {
    validate.value = true;
}

function resetValidation(): void {
    validate.value = false;
}

function setValidationStatus(isValid: boolean): void {
    resetValidation();
    nextStep(isValid);
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
</script>

<template>
    <div>
        <BaseWizard :steps="steps" :current-step="currentStep" @next-step="nextStep" @prev-step="prevStep">
            <TravelSelect
                v-if="currentStep === 0" :trigger-validation="validate" @validate="setValidationStatus($event)"
            />
            <CustomerInfoEditorForm
                v-if="currentStep === 1" :trigger-validation="validate" @validate="setValidationStatus($event)"
            />
        </BaseWizard>
    </div>
</template>
