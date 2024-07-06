<script setup lang="ts">
import type { ITravel } from '~/types/travels/travels.model';

const props = defineProps<{ travel?: ITravel | null }>();

const emit = defineEmits<{
    (event: 'update:validation', data: { formData: ITravel | null; valid: boolean }): void;
}>();

const { travels, loading, fetchTravels } = useTravels();

const selectedTravel = ref<ITravel | null>(null);

async function search(q: string): Promise<ITravel[]> {
    await fetchTravels(q);
    return travels.value;
}

const showValidationError = ref(false);

function submitForm() {
    showValidationError.value = !selectedTravel.value;
    emit('update:validation', { formData: selectedTravel.value, valid: !!selectedTravel.value });
}

watch(selectedTravel, (newValue) => {
    if (newValue) {
        showValidationError.value = false;
    }
});

onMounted(() => {
    if (props.travel) {
        selectedTravel.value = props.travel;
    }
});

defineExpose({ submitForm });
</script>

<template>
    <div class="flex flex-col gap-7">
        <UFormGroup :error="showValidationError">
            <USelectMenu
                v-model="selectedTravel"
                :loading="loading"
                :searchable="search"
                :placeholder="$t('TRAVELS.S09')"
                option-attribute="name"
                trailing
                by="id"
            />
        </UFormGroup>
        <TravelInfoCard v-if="selectedTravel" :travel="selectedTravel" />
    </div>
</template>
