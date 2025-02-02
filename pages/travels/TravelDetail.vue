<script setup lang="ts">
import { format } from 'date-fns';
import { utilsService } from '~/services/utils.service';

const { selectedTravel, setSelectedTravel, fetchTravelDetails, loading, deleteTravel } = useTravels();

const routeID = ref(useRoute().params.id as string);

const pictureURL = computed(() => {
    if (selectedTravel?.value && selectedTravel.value.picture) {
        const blob = utilsService.base64ToBlob(selectedTravel?.value?.picture);
        return URL.createObjectURL(blob);
    }
    else {
        return '';
    }
});

// Edit
const showEditModal = ref(false);
const showDeleteConfirmation = ref(false);

// Delete
async function handleTravelDelete(travelID: string): Promise<void> {
    await deleteTravel(travelID);
    await setSelectedTravel();
    await navigateTo({ name: 'travels' });
}

onBeforeMount(async () => {
    try {
        await fetchTravelDetails(routeID.value);
    }
    catch (e) {
        await navigateTo({ name: 'travels' });
    }
});

onBeforeUnmount(() => {
    setSelectedTravel();
});
</script>

<template>
    <BaseBackButton class="mb-3" back-route-name="travels" :label="$t('PROJECT_COMMON.S01', 2)" />
    <div v-if="loading || !selectedTravel" class="space-y-2">
        <USkeleton class="h-4 w-[150]  md:w-[400px]  bg-gray-300 dark:bg-gray-100" />
        <USkeleton class="h-[200px] w-full  bg-gray-300 dark:bg-gray-100" />
        <USkeleton class="h-4 w-[180px] bg-gray-300 dark:bg-gray-100" />
        <USkeleton class="h-4 w-[300px]  bg-gray-300 dark:bg-gray-100" />
        <USkeleton class="h-4 w-[250px] bg-gray-300 dark:bg-gray-100" />
    </div>
    <div v-else class="flex flex-col space-y-2">
        <div class="w-full flex justify-between align-top">
            <p class="font-bold text-3xl">
                {{ selectedTravel.name }}
            </p>

            <div class="flex gap-2 items-center">
                <UButton class="grow-0" icon="i-heroicons-pencil" @click="showEditModal = true">
                    {{ $t('COMMON.S03') }}
                </UButton>

                <BasePopConfirm :show="showDeleteConfirmation" @update:show="showDeleteConfirmation = $event" @negative="showDeleteConfirmation = false" @positive="handleTravelDelete(selectedTravel.id)">
                    <UButton
                        icon="i-heroicons-trash"
                        size="sm"
                        color="primary"
                        square
                        variant="outline"
                    />
                </BasePopConfirm>
            </div>
        </div>
        <div class="h-[200px] w-full flex">
            <img class="rounded-md shadow-sm w-full h-full block object-cover" :src="pictureURL" alt="Preview">
        </div>

        <BaseFieldDetail :label="$t('COMMON.S09')" :value="selectedTravel.description" />

        <div class="flex gap-6">
            <BaseFieldDetail :label="$t('PROJECT_COMMON.S03')" :value=" format(new Date(selectedTravel.departureDate), 'dd/MM/yyyy')" />
            <BaseFieldDetail :label="$t('PROJECT_COMMON.S04')" :value=" format(new Date(selectedTravel.returnDate), 'dd/MM/yyyy')" />
        </div>

        <BaseFieldDetail :label="$t('PROJECT_COMMON.S05')" :value="selectedTravel.price" />

        <BaseFieldDetail :label="$t('TRAVELS.S06')" :value="selectedTravel.rating || '-'" />
    </div>
    <UModal v-model="showEditModal">
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
                        {{ $t('TRAVELS.S07') }}
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="showEditModal = false" />
                </div>
            </template>

            <TravelEditorForm :travel="selectedTravel" />
        </UCard>
    </UModal>
</template>

<style scoped lang="scss">

</style>
