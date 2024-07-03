<script setup lang="ts">
import { ref, watch } from 'vue';
import { useTravels } from '~/composables/useTravels';

const emit = defineEmits(['toggleTravelCreation', 'rowClick']);

const q = ref('');
const { travels, error, loading, fetchTravels } = useTravels();

const columns = [
    {
        key: 'name',
        label: 'Name',
        sortable: true,
    },
    {
        key: 'departureDate',
        label: 'Departure Date',
        sortable: true,
    },
    {
        key: 'returnDate',
        label: 'Return Date',
        sortable: true,
    },
    {
        key: 'description',
        label: 'Description',
        sortable: true,
    },
    {
        key: 'price',
        label: 'Price',
        sortable: true,
    },
    {
        key: 'rating',
        label: 'Rating',
        sortable: true,
    },
];

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
            <UInput v-model="q" placeholder="Filter travels..." />
            <UButton class="ml-auto" @click="emit('toggleTravelCreation')">
                New Travel
            </UButton>
        </div>
        <UTable :loading="loading" :rows="travels" :columns="columns" @select="emit('rowClick', $event)" />
        <p v-if="error" class="text-red-500">
            {{ error.message }}
        </p>
    </UCard>
</template>

<style scoped lang="scss">

</style>
