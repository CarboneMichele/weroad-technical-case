<script setup lang="ts">
const props = defineProps<{ label?: string; backRouteName?: string }>();
</script>

<template>
    <div class="flex items-center gap-2">
        <NuxtLink :to="props.backRouteName ? { name: props.backRouteName } : './'">
            <UButton icon="i-heroicons-arrow-left" variant="ghost" />
        </NuxtLink>
        <p class="">
            {{ props.label ?? $t('COMMON.S05') }}
        </p>
    </div>
</template>

<style scoped lang="scss">

</style>
