<script setup lang="ts">
const showTravelCreationModal = ref<boolean>(false);
</script>

<template>
    <template v-if="$route.name === 'travels'">
        <BaseBreadcrumbs />
        <TravelsDataTable @toggle-travel-creation="showTravelCreationModal = true" />
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
                            Modal
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="showTravelCreationModal = false" />
                    </div>
                </template>

                <TravelEditorForm @creation-complete="showTravelCreationModal = false" />
            </UCard>
        </UModal>
    </template>
    <NuxtPage v-else />
</template>

<style scoped lang="scss">

</style>
