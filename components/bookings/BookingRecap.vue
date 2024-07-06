<script setup lang="ts">
import type { AccordionItem } from '#ui/types';
import type { IBooking } from '~/types/bookings/bookings.model';

const props = defineProps<{ booking: Omit<IBooking, 'id'> | IBooking }>();
const { t } = useI18n();

const recapItems = computed<AccordionItem[]>(() => {
    return [
        {
            label: t('PROJECT_COMMON.S01', 1),
            icon: 'i-heroicons-rocket-launch',
            defaultOpen: true,
            slot: 'travel',
        },
        {
            label: t('PROJECT_COMMON.S06', 1),
            icon: 'i-heroicons-user',
            slot: 'customer',
        },
        {
            label: t('BOOKINGS.S05', 1),
            icon: 'i-heroicons-credit-card',
            slot: 'payment',
        },
    ];
});
</script>

<template>
    <UAccordion :items="recapItems" class="max-w-[600px]">
        <template #travel>
            <TravelInfoCard class="w-full md:w-[400px] mx-auto" :travel="props.booking.travel" />
        </template>
        <template #customer>
            <CustomerDetails class="mx-auto w-fit" :customer="props.booking.customer" />
        </template>
        <template #payment>
            <BasePaymentMethod class="mb-4" :card-type="props.booking.payment" static />
            <BaseFieldDetail :label="$t('COMMON.S22')" :value="props.booking.notes" />
        </template>
    </UAccordion>
</template>

<style lang="scss" scoped>

</style>
