<script setup lang="ts">
import type { IBooking } from '~/types/bookings/bookings.model';

const showBookingCreationModal = ref<boolean>(false);

const showBookingDetail = ref<boolean>(false);
const selectedBooking = ref<IBooking | null>(null);

const { fetchBookings } = useBookings();

async function openBookingDetail(booking: IBooking): Promise<void> {
    showBookingDetail.value = true;
    selectedBooking.value = booking;
}
async function closeBookingDetail(): Promise<void> {
    showBookingDetail.value = false;
    selectedBooking.value = null;
}

async function finalizeBookingCreation(): Promise<void> {
    showBookingCreationModal.value = false;
    await fetchBookings();
}
</script>

<template>
    <BookingsDataTable
        @toggle-booking-creation="showBookingCreationModal = true" @row-click="openBookingDetail($event)"
    />
    <UModal
        v-model="showBookingCreationModal" :ui="{
            width: 'md:max-w-[1200px]',
        }"
    >
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

            <BookingCreationWizard @finalized="finalizeBookingCreation" />
        </UCard>
    </UModal>
    <UModal
        v-model="showBookingDetail"
    >
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
                        {{ $t('BOOKINGS.S08') }}
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click=" closeBookingDetail" />
                </div>
            </template>

            <BookingRecap v-if="selectedBooking" :booking="selectedBooking" />
        </UCard>
    </UModal>
</template>

<style scoped lang="scss">

</style>
