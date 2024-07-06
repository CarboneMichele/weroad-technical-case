<script setup lang="ts">
import type { ICustomerInfo } from '~/types/bookings/bookings.model';

const props = defineProps<{ customer: ICustomerInfo }>();
</script>

<template>
    <div class="flex flex-col gap-y-3">
        <div class="flex gap-x-20 flex-wrap md:flex-nowrap ">
            <BaseFieldDetail class="break-words w-[100px] md:w-[200px]" :label="$t('COMMON.S11')" :value="props.customer.firstName" />
            <BaseFieldDetail class="break-words w-[100px] md:w-[200px]" :label="$t('COMMON.S10')" :value="props.customer.lastName" />
        </div>

        <div class="flex gap-x-20 flex-wrap md:flex-nowrap">
            <BaseFieldDetail class="break-words w-[100px] md:w-[200px]" :label="$t('COMMON.S14')" :value="props.customer.email" />
            <BaseFieldDetail class="break-words w-[100px] md:w-[200px]" :label="$t('COMMON.S12')" :value="props.customer.age" />
        </div>
        <div class="flex gap-x-20 flex-wrap md:flex-nowrap">
            <BaseFieldDetail class="break-words w-[100px] md:w-[200px]" :label="$t('COMMON.S20')" :value="props.customer.phone" />
            <BaseFieldDetail class="break-words w-[100px] md:w-[200px]" :label="$t('COMMON.S13')" :value="props.customer.gender ? $t(`ENUMS.GENDER_${props.customer.gender}`) : '-'" />
        </div>
    </div>
</template>
