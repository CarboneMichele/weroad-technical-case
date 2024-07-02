<script setup lang="ts">
import type { ITravel } from '~/types/travels.model';

const q = ref('');

const { travels, error, fetchTravels, deleteTravel, addTravel, updateTravel } = useTravels();

onMounted(() => {
    fetchTravels();
});

const filteredRows = computed(() => {
    if (!q.value) {
        return travels.value;
    }

    return travels.value.filter((travel: ITravel) => {
        return Object.values(travel).some((value) => {
            return String(value).toLowerCase().includes(q.value.toLowerCase());
        });
    });
});

const columns = [
    {
        key: 'id',
        label: 'ID',
        sortable: true,
    },
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
        key: 'picture',
        label: 'Picture',
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
</script>

<template>
    <template v-if="$route.name === 'travels'">
        <div> Travels </div>

        <UCard
            class="w-full mt-3"

            :ui="{
                base: '',
                ring: '',
                header: { padding: 'px-4 py-5' },
                body: { padding: '', base: '' },
                footer: { padding: 'p-4' },
            }"
        >
            <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
                <UInput v-model="q" placeholder="Filter travels..." />
            </div>
            <UTable loading :rows="filteredRows" :columns="columns" />
        </UCard>
    </template>
    <NuxtPage v-else />
</template>

<style scoped lang="scss">

</style>
