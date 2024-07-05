<script setup lang="ts">
import { useBookings } from '~/composables/useBookings';
import { utilsService } from '~/services/utils.service';

const emit = defineEmits(['toggleBookingCreation', 'rowClick']);
const { t } = useI18n();
const q = ref('');
const { bookings, loading, fetchBookings } = useBookings();

const columns = computed(() => [
    {
        key: 'customer',
        label: t('PROJECT_COMMON.S06'),
        sortable: true,
    },
    {
        key: 'travel',
        label: t('PROJECT_COMMON.S01', 1),
        sortable: true,
    },
]);

watch(q, () => {
    fetchBookings(q.value);
});

onMounted(() => {
    fetchBookings();
});
</script>

<template>
    <UCard
        class="w-full mt-3" :ui="{
            base: '',
            ring: '',
            header: { padding: 'px-4 py-5' },
            body: { padding: '', base: '' },
            footer: { padding: 'p-4' },
        }"
    >
        <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
            <UInput v-model="q" :placeholder="t('BOOKINGS.S03')" />
            <UButton class="ml-auto" @click="emit('toggleBookingCreation')">
                {{ t('BOOKINGS.S02') }}
            </UButton>
        </div>
        <UTable :loading="loading" :rows="bookings" :columns="columns" @select="emit('rowClick', $event)">
            <template #departureDate-data="{ row }">
                <span>{{ utilsService.getFormattedDate(row.departureDate) }}</span>
            </template>
            <template #returnDate-data="{ row }">
                <span>{{ utilsService.getFormattedDate(row.returnDate) }}</span>
            </template>

            <template #empty-state>
                <div class="flex flex-col items-center justify-center py-6 gap-3">
                    <span class="italic text-sm">{{ t('PROJECT_COMMON.S02', 0) }}</span>
                    <UButton label="Add booking" @click="emit('toggleBookingCreation')" />
                </div>
            </template>
        </UTable>
    </UCard>
</template>

<style scoped lang="scss">

</style>
