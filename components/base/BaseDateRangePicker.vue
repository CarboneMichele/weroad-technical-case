<script setup lang="ts">
import { format } from 'date-fns';

const props = defineProps<{ modelValue: { start: Date; end: Date } }>();
const emit = defineEmits(['update:modelValue']);

const { modelValue } = toRefs(props);

const selected = ref<{ start: Date; end: Date }>({
    start: modelValue.value.start,
    end: modelValue.value.end,
});

watch(modelValue, (newVal) => {
    selected.value = newVal;
}, { deep: true });

watch(selected, (newVal) => {
    emit('update:modelValue', {
        start: newVal.start,
        end: newVal.end,
    });
});
</script>

<template>
    <UPopover :popper="{ placement: 'bottom-start' }">
        <UButton icon="i-heroicons-calendar-days-20-solid">
            {{ format(selected.start, 'd MMM, yyy') }} - {{ format(selected.end, 'd MMM, yyy') }}
        </UButton>

        <template #panel="{ close }">
            <BaseDatePicker v-model="selected" @close="close" />
        </template>
    </UPopover>
</template>
