<script setup lang="ts">
import { type Duration, format, isSameDay, parseISO, sub } from 'date-fns';
import type { FormError, FormSubmitEvent } from '#ui/types';
import type { ITravel } from '~/types/travels/travels.model';

const emit = defineEmits(['creationComplete']);
const { dateRange, updateDateRange } = useDateRange(sub(new Date(), { days: 1 }), new Date());

const travelFormModel: Partial<ITravel> = reactive({
    name: '',
    departureDate: dateRange.start.toISOString(),
    returnDate: dateRange.end.toISOString(),
    picture: '',
    description: '',
    price: undefined,
});

// Date Range management
function updateTravelTimeFrame(): void {
    const { start, end } = dateRange;
    travelFormModel.departureDate = start.toISOString();
    travelFormModel.returnDate = end.toISOString();
}

watch(dateRange, () => {
    updateTravelTimeFrame();
});

// Submit logic
const { loading, fetchTravels, addTravel } = useTravels();

function validate(state: Partial<ITravel>): FormError[] {
    const requiredFields: (keyof ITravel)[] = ['name', 'returnDate', 'picture', 'price'];
    const errors: FormError[] = [];

    requiredFields.forEach((field) => {
        if (!state[field]) {
            errors.push({ path: field, message: 'Required' });
        }
    });

    return errors;
}

async function onSubmit(form: FormSubmitEvent<Partial<ITravel>>) {
    await addTravel(form.data);
    await fetchTravels();
    emit('creationComplete');
}
</script>

<template>
    <UForm :validate="validate" :validate-on="['submit']" :state="travelFormModel" class="flex flex-col gap-y-3" @submit="onSubmit">
        <UFormGroup label="Name *" name="name">
            <UInput v-model="travelFormModel.name" />
        </UFormGroup>

        <UFormGroup label="Description" name="description">
            <UTextarea v-model="travelFormModel.description" :rows="1" autoresize />
        </UFormGroup>

        <UFormGroup label="TimeFrame *">
            <BaseDateRangePicker :model-value="dateRange" @update:model-value="updateDateRange($event)" />
        </UFormGroup>

        <UFormGroup label="Price *" name="price">
            <UInput v-model="travelFormModel.price" type="number" />
        </UFormGroup>

        <UFormGroup label="Picture * " name="picture">
            <BaseFileUpload
                @base64-change="(base64: string) => {
                    travelFormModel.picture = base64;
                }"
            />
        </UFormGroup>

        <UButton type="submit" class="mt-4 w-fit ml-auto" :loading="loading">
            Submit
        </UButton>
    </UForm>
</template>
