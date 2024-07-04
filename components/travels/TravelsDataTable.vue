<script setup lang="ts">
import { useTravels } from '~/composables/useTravels';
import { utilsService } from '~/services/utils.service';

const emit = defineEmits(['toggleTravelCreation', 'rowClick']);
const { t } = useI18n();
const q = ref('');
const { travels, loading, fetchTravels } = useTravels();

const columns = computed(() => [
    {
        key: 'name',
        label: t('COMMON.S08'),
        sortable: true,
    },
    {
        key: 'departureDate',
        label: t('PROJECT_COMMON.S03'),
        sortable: true,
    },
    {
        key: 'returnDate',
        label: t('PROJECT_COMMON.S04'),
        sortable: true,
    },
    {
        key: 'description',
        label: t('COMMON.S09'),
        sortable: true,
    },
    {
        key: 'price',
        label: t('PROJECT_COMMON.S05'),
        sortable: true,
    },
    {
        key: 'rating',
        label: t('TRAVELS.S06'),
        sortable: true,
    },
]);

watch(q, () => {
    fetchTravels(q.value);
});

onMounted(() => {
    fetchTravels();
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
            <UInput v-model="q" :placeholder="t('TRAVELS.S03')" />
            <UButton class="ml-auto" @click="emit('toggleTravelCreation')">
                {{ t('TRAVELS.S02') }}
            </UButton>
        </div>
        <UTable :loading="loading" :rows="travels" :columns="columns" @select="emit('rowClick', $event)">
            <template #departureDate-data="{ row }">
                <span>{{ utilsService.getFormattedDate(row.departureDate) }}</span>
            </template>
            <template #returnDate-data="{ row }">
                <span>{{ utilsService.getFormattedDate(row.returnDate) }}</span>
            </template>

            <template #empty-state>
                <div class="flex flex-col items-center justify-center py-6 gap-3">
                    <span class="italic text-sm">{{ t('PROJECT_COMMON.S01', 0) }}</span>
                    <UButton label="Add travel" @click="emit('toggleTravelCreation')" />
                </div>
            </template>
        </UTable>
    </UCard>
</template>

<style scoped lang="scss">

</style>
