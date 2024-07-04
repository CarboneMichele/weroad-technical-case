<script setup lang="ts">
import type { ITravel } from '~/types/travels/travels.model';

const showTravelCreationModal = ref<boolean>(false);

async function goToTravelDetail(travel: ITravel): Promise<void> {
    await navigateTo({ name: 'travel', params: {
        id: travel.id,
    } });
}
</script>

<template>
    <TravelsDataTable
        @toggle-travel-creation="showTravelCreationModal = true" @row-click="goToTravelDetail($event)"
    />
    <UModal v-model="showTravelCreationModal">
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
                        {{ $t('TRAVELS.S04') }}
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="showTravelCreationModal = false" />
                </div>
            </template>

            <TravelEditorForm @creation-complete="showTravelCreationModal = false" />
        </UCard>
    </UModal>
</template>

<style scoped lang="scss">

</style>
