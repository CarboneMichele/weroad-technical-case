<script setup lang="ts">
import { format } from 'date-fns';
import { utilsService } from '~/services/utils.service';
import type { ITravel } from '~/types/travels/travels.model';

const props = defineProps<{ travel: ITravel }>();
const pictureURL = computed(() => {
    if (props.travel && props.travel.picture) {
        const blob = utilsService.base64ToBlob(props.travel?.picture);
        return URL.createObjectURL(blob);
    }
    else {
        return '';
    }
});
</script>

<template>
    <UCard class="bg-gray-100">
        <div class="w-full flex justify-between align-top mb-3">
            <p class="font-bold text-3xl">
                {{ props.travel.name }}
            </p>
        </div>
        <div class="h-[200px] w-full flex mb-3">
            <img class="rounded-md shadow-sm w-full h-full block object-cover" :src="pictureURL" alt="Preview">
        </div>

        <div class="flex flex-col gap-3">
            <BaseFieldDetail :label="$t('COMMON.S09')" :value="props.travel.description" />

            <div class="flex gap-6">
                <BaseFieldDetail :label="$t('PROJECT_COMMON.S03')" :value=" format(new Date(props.travel.departureDate), 'dd/MM/yyyy')" />
                <BaseFieldDetail :label="$t('PROJECT_COMMON.S04')" :value=" format(new Date(props.travel.returnDate), 'dd/MM/yyyy')" />
            </div>

            <BaseFieldDetail :label="$t('PROJECT_COMMON.S05')" :value="props.travel.price" />

            <BaseFieldDetail :label="$t('TRAVELS.S06')" :value="props.travel.rating || '-'" />
        </div>
    </UCard>
</template>

<style lang="scss">

</style>
