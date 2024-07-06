<script setup lang="ts">
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
                <p>{{ $t('COMMON.S02') }}</p>
                <div class="flex justify-end mt-4 gap-2">
                    <UButton color="white" :label="$t('COMMON.S05')" @click="handleCancel" />
                    <UButton color="primary" :label="$t('COMMON.S01')" @click="handleConfirm" />
                </div>
            </div>
        </template>
    </UPopover>
</template>
