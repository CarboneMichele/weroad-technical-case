<!-- pages/index.vue -->
<script setup lang="ts">
import { ref } from 'vue';
import type { ICustomerInfo, IPaymentOptionsFormModel, TCustomerWizardForm } from '~/types/bookings/bookings.model';
import type { ITravel } from '~/types/travels/travels.model';
import type { IStep } from '~/types/ui/stepper.model';

const { t } = useI18n();

const steps = ref<IStep<TCustomerWizardForm>[]>([
    {
        key: 'travel',
        title: t('PROJECT_COMMON.S01', 1),
        description: t('TRAVELS.S08'),
        icon: 'rocket-launch',
        hasValidation: true,
        formData: null,
        valid: false,
    },
    {
        key: 'customer',
        title: t('PROJECT_COMMON.S06', 1),
        description: t('PROJECT_COMMON.S07'),
        icon: 'user',
        hasValidation: true,
        formData: null,
        valid: false,
    },
    {
        key: 'payment',
        title: t('BOOKINGS.S05', 1),
        description: t('BOOKINGS.S06'),
        icon: 'credit-card',
        hasValidation: true,
        formData: null,
        valid: false,
    },
    {
        key: 'review',
        title: t('BOOKINGS.S07', 1),
        description: t('BOOKINGS.S08'),
        icon: 'credit-card',
        hasValidation: false,
        formData: null,
        valid: false,
    },
]);

const currentStepIndex = ref(0);
const currentStepRef = ref<Component | null>(null);

function handleStepValidation<T extends TCustomerWizardForm>(stepNumber: number, validationEvent: { formData: T; valid: boolean }): void {
    populateStepFormField(validationEvent.formData, stepNumber);

    if (validationEvent.valid) {
        steps.value[stepNumber].valid = true;
        goNext();
    }

    else {
        steps.value[stepNumber].valid = false;
    }
}

function populateStepFormField<T extends TCustomerWizardForm>(formData: T, stepNumber: number): void {
    steps.value[stepNumber].formData = formData;
}

function onNextStepClick() {
    if (steps.value[currentStepIndex.value].hasValidation) {
        // validate
        if (currentStepRef.value) {
            currentStepRef.value.submitForm();
        }
    }
    else {
        if (currentStepIndex.value < steps.value.length - 1) {
            goNext();
        }
    }
}

function onPrevStepClick() {
    if (currentStepIndex.value > 0) {
        currentStepIndex.value--;
    }
}

function goNext() {
    currentStepIndex.value++;
}
</script>

<template>
    {{ !!steps[1].valid }}
    <div>
        <BaseWizard :steps="steps" :current-step="currentStepIndex" @next-step="onNextStepClick" @prev-step="onPrevStepClick">
            <TravelSelect
                v-if="currentStepIndex === 0"
                ref="currentStepRef" :travel="(steps[0].formData as ITravel | null)" @update:validation="handleStepValidation<ITravel | null>(0, $event)"
            />
            <CustomerInfoEditorForm
                v-if="currentStepIndex === 1"
                ref="currentStepRef" :customer="(steps[1].formData as ICustomerInfo | null)"
                @update:validation="handleStepValidation<ICustomerInfo | null>(1, $event)"
            />
            <BookingPaymentOptions
                v-if="currentStepIndex === 2"
                ref="currentStepRef" :payment-option="(steps[2].formData as IPaymentOptionsFormModel | null)" @validate="handleStepValidation<IPaymentOptionsFormModel | null>(2, $event)"
            />
        </BaseWizard>
    </div>
</template>
