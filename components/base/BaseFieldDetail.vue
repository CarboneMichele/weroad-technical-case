<script setup lang="ts">
const props = defineProps<{ icon?: string; label: string; value: string | number | null }>();
</script>

<template>
    <div class="flex flex-col gap-0">
        <div class="flex gap-1">
            <UIcon v-if="props.icon" :name="props.icon" />
            <p class="font-bold">
                {{ props.label }}:
            </p>
        </div>
        <p class="text-base">
            {{ props.value || '-' }}
        </p>
    </div>
</template>

<style lang="scss" scoped>

</style>
