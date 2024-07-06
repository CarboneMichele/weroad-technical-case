<script setup lang="ts">
import type { ITravel } from '~/types/travels/travels.model';

const props = defineProps<{
    handleSubmit: () => void;
    travel?: ITravel | null ;
}>();

const emit = defineEmits<{
    (event: 'validate', data: { formData: ITravel | null; valid: boolean }): void;
}>();

const { travels, loading, fetchTravels } = useTravels();

const selectedTravel = ref<ITravel | null>(null);

async function search(q: string): Promise<ITravel[]> {
    await fetchTravels(q);
    return travels.value;
}

function validateForm() {
    if (selectedTravel.value) {
        emit('validate', { formData: selectedTravel.value, valid: !!selectedTravel.value });
    }
}

watch(() => props.triggerValidation, (newValue) => {
    if (newValue) {
        validateForm();
    }
});

onMounted(() => {
    if (props.travel) {
        selectedTravel.value = props.travel;
    }
});

function submitForm() {
    props.handleSubmit(); // Chiama la funzione handleSubmit passata dal genitore
}
</script>

<template>
    {{ props.triggerValidation }}
    <div class="flex flex-col gap-7">
        <USelectMenu
            v-model="selectedTravel"
            :loading="loading"
            :searchable="search"
            :placeholder="$t('TRAVELS.S09')"
            option-attribute="name"
            trailing
            by="id"
        />
        <TravelInfoCard v-if="selectedTravel" :travel="selectedTravel" />
    </div>
</template>
