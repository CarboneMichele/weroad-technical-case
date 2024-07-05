<script setup lang="ts">
import type { IBooking } from '~/types/bookings/bookings.model';

const showBookingCreationModal = ref<boolean>(false);

async function goToBookingDetail(booking: IBooking): Promise<void> {
    await navigateTo({ name: 'booking', params: {
        id: booking.id,
    } });
}
</script>

<template>
    <BookingsDataTable
        @toggle-booking-creation="showBookingCreationModal = true" @row-click="goToBookingDetail($event)"
    />
    <UModal v-model="showBookingCreationModal">
        <UCard
            :ui="{
                base: 'h-full flex flex-col',
                rounded: '',
                divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                body: {
                    base: 'grow',
                },
            }"
        >
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        {{ $t('BOOKINGS.S04') }}
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="showBookingCreationModal = false" />
                </div>
            </template>
        </UCard>
    </UModal>
</template>

<style scoped lang="scss">

</style>
