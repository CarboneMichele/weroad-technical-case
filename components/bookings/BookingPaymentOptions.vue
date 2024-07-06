<script setup lang="ts">
import { ref } from 'vue';
import { IPaymentOption, type IPaymentOptionsFormModel } from '~/types/bookings/bookings.model';

const props = defineProps<{ paymentOption?: IPaymentOptionsFormModel | null }>();

const emit = defineEmits<{
    (event: 'update:validation', data: { formData: IPaymentOptionsFormModel; valid: boolean }): void;
}>();

const paymentsFormModel = ref<IPaymentOptionsFormModel>({
    option: IPaymentOption.PAYPAL,
    notes: '',
});

function submitForm() {
    emit('update:validation', { formData: paymentsFormModel.value, valid: true });
}

onMounted(() => {
    if (props.paymentOption) {
        paymentsFormModel.value = { ...props.paymentOption };
    }
});

defineExpose({ submitForm });
</script>

<template>
    <div class="w-full max-w-[400px] mx-auto">
        <BasePaymentMethod v-model="paymentsFormModel.option" :card-type="IPaymentOption.PAYPAL" :size="30" />
        <BasePaymentMethod v-model="paymentsFormModel.option" :card-type="IPaymentOption.REVOLUT" :size="30" />
        <BasePaymentMethod v-model="paymentsFormModel.option" :card-type="IPaymentOption.CREDIT" :size="50" />

        <UFormGroup :label="$t('COMMON.S22')" class="mt-6">
            <UTextarea v-model="paymentsFormModel.notes" :rows="3" autoresize />
        </UFormGroup>
    </div>
</template>
