<script setup lang="ts">
import { sub } from 'date-fns';
import type { FormError, FormSubmitEvent } from '#ui/types';
import type { ITravel } from '~/types/travels/travels.model';

const props = defineProps<{ travel?: ITravel }>();
const emit = defineEmits(['creationComplete']);

const { dateRange, updateDateRange } = useDateRange(sub(new Date(), { days: 1 }), new Date());

const travelFormModel = ref<Partial<ITravel>>({
    name: '',
    departureDate: dateRange.start.toISOString(),
    returnDate: dateRange.end.toISOString(),
    picture: '',
    description: '',
    price: undefined,
});

// Date Range management
function updateTravelTimeFrame(): void {
    travelFormModel.value.departureDate = dateRange.start.toISOString();
    travelFormModel.value.returnDate = dateRange.end.toISOString();
}

watch(dateRange, () => {
    updateTravelTimeFrame();
});

// Edit Logic
const isEdit = ref(props.travel);

function populateForm(): void {
    if (props.travel) {
        travelFormModel.value = { ...props.travel };
    }
}

// Submit logic
const { loading, fetchTravels, addTravel, updateTravel, fetchTravelDetails } = useTravels();

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
    if (isEdit.value) {
        await updateTravel(props.travel?.id as string, form.data);
        await fetchTravelDetails(props.travel?.id as string);
    }
    else {
        await addTravel(form.data);
        await fetchTravels();
        emit('creationComplete');
    }
}

onMounted(() => {
    if (isEdit.value) {
        populateForm();
    }
});
</script>

<template>
    <UForm :validate="validate" :validate-on="['submit']" :state="travelFormModel" class="flex flex-col gap-y-3" @submit="onSubmit">
        <UFormGroup label="Name" name="name" required>
            <UInput v-model="travelFormModel.name" />
        </UFormGroup>

        <UFormGroup label="Description" name="description">
            <UTextarea v-model="travelFormModel.description" :rows="1" autoresize />
        </UFormGroup>

        <UFormGroup label="TimeFrame" required>
            <BaseDateRangePicker :model-value="dateRange" @update:model-value="updateDateRange($event)" />
        </UFormGroup>

        <UFormGroup label="Price (€)" required name="price">
            <UInput v-model="travelFormModel.price" type="number" />
        </UFormGroup>

        <UFormGroup label="Picture" name="picture" required>
            <BaseFileUpload
                :base64="travelFormModel.picture"
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
