<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';
import CreditCards from './../../assets/images/icons/icon_credit_cards.svg';
import PayPal from './../../assets/images/icons/icon_paypal.svg';
import Revolut from './../../assets/images/icons/icon_revolut.svg';
import { IPaymentOption } from '~/types/bookings/bookings.model';

const props = defineProps<{ cardType: IPaymentOption; size?: 25 | 30 | 35 | 50; static?: boolean; modelValue?: IPaymentOption | null }>();
const emit = defineEmits(['update:modelValue']);

const logo = computed<string>(() => {
    switch (props.cardType) {
        case IPaymentOption.CREDIT:
            return CreditCards;
        case IPaymentOption.PAYPAL:
            return PayPal;
        case IPaymentOption.REVOLUT:
            return Revolut;
        default:
            return CreditCards;
    }
});

const logoSizeClass = computed<string>(() => {
    switch (props.size) {
        case 25:
            return 'w-[25px]';
        case 30:
            return 'w-[30px]';
        case 35:
            return 'w-[35px]';
        case 50:
            return 'w-[50px]';
        default:
            return 'w-[30px]';
    }
});

const isSelected = computed<boolean>(() => props.modelValue === props.cardType);

function selectOption() {
    emit('update:modelValue', props.cardType);
}
</script>

<template>
    <div
        v-if="props.static"
        class="flex  justify-center items-center p-2 border-2 rounded-md w-full transition-colors dark:bg-gray-200"
    >
        <img :src="logo" :alt="props.cardType.toLowerCase()" class="mr-2 flex" :class="logoSizeClass">
        <span class="text-lg font-medium text-primary-600">{{ $t(`ENUMS.PAYMENT_${props.cardType}`) }}</span>
    </div>
    <label v-else class="flex items-center mb-2 cursor-pointer" @click="selectOption">
        <input
            type="radio"
            name="paymentMethod"
            class="hidden"
            :value="props.cardType"
            :checked="isSelected"
        >
        <div
            class="flex justify-center items-center p-2 border-2 rounded-md w-full transition-colors dark:bg-gray-200" :class="[{ 'border-primary-600 dark:border-2': isSelected }]"
        >
            <img :src="logo" :alt="props.cardType.toLowerCase()" class="mr-2 flex" :class="logoSizeClass">
            <span class="text-lg font-medium text-primary-600">{{ $t(`ENUMS.PAYMENT_${props.cardType}`) }}</span>
        </div>
    </label>
</template>
