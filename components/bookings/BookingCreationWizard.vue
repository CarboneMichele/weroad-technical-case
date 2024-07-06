<!-- pages/index.vue -->
<script setup lang="ts">
import { useSteps } from '~/composables/useWizard';
import type { IBooking, ICustomerInfo, IPaymentOptionsFormModel } from '~/types/bookings/bookings.model';
import type { ITravel } from '~/types/travels/travels.model';
import type { IStep } from '~/types/ui/stepper.model';

const emit = defineEmits<{
    (event: 'finalized', finalized: boolean): void;
}>();

const { t } = useI18n();

const bookingWizardSteps: IStep[] = [
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
];

const {
    stepsArray,
    currentStepKey,
    currentStepRef,
    currentStepIndex,
    handleStepValidation,
    onNextStepClick,
    onPrevStepClick,
    getStepFormData,
} = useSteps(bookingWizardSteps);

const bookingWizardForm: ComputedRef<Omit<IBooking, 'id'> | IBooking> = computed(() => {
    return {
        travel: getStepFormData<ITravel>('travel'),
        customer: getStepFormData<ICustomerInfo>('customer'),
        payment: (getStepFormData<IPaymentOptionsFormModel>('payment')).option,
        notes: (getStepFormData<IPaymentOptionsFormModel>('payment')).notes,
    };
});

const { loading, addBooking } = useBookings();

async function finalizeWizard(): Promise<void> {
    const response = await addBooking(bookingWizardForm.value);
    if (response) {
        emit('finalized', true);
    }
}
</script>

<template>
    <div>
        <BaseWizard :steps="stepsArray" :current-step="currentStepIndex" :loading="loading" @next-step="onNextStepClick" @prev-step="onPrevStepClick" @finalize="finalizeWizard">
            <TravelSelect
                v-if="currentStepKey === 'travel'"
                ref="currentStepRef"
                class="w-full md:w-[400px]" :travel="(getStepFormData('travel') as ITravel | null)" @update:validation="handleStepValidation('travel', $event)"
            />
            <CustomerInfoEditorForm
                v-if="currentStepKey === 'customer'"
                ref="currentStepRef" :customer="(getStepFormData('customer') as ICustomerInfo | null)"
                @update:validation="handleStepValidation('customer', $event)"
            />
            <BookingPaymentOptions
                v-if="currentStepKey === 'payment'"
                ref="currentStepRef" :payment-option="(getStepFormData('payment') as IPaymentOptionsFormModel | null)" @update:validation="handleStepValidation('payment', $event)"
            />

            <BookingRecap v-if="currentStepKey === 'review'" :booking="bookingWizardForm" />
        </BaseWizard>
    </div>
</template>
