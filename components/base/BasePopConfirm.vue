<script setup lang="ts">
import { defineEmits, ref } from 'vue';

const props = defineProps<{ show: boolean }>();
const emits = defineEmits(['positive', 'negative', 'update:show']);

const isOpen = computed({
    get() {
        return props.show;
    },
    set(value) {
        emits('update:show', value);
    },
});

function handleCancel() {
    emits('negative');
}

function handleConfirm() {
    emits('positive');
}
</script>

<template>
    <UPopover v-model:open="isOpen" :popper="{ arrow: true }">
        <slot />

        <template #panel>
            <div class="p-4">
                <p>Sure you want to continue?</p>
                <div class="flex justify-end mt-4 gap-2">
                    <UButton color="white" label="Cancel" @click="handleCancel" />
                    <UButton color="primary" label="Confirm" @click="handleConfirm" />
                </div>
            </div>
        </template>
    </UPopover>
</template>
