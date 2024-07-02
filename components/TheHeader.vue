<script setup>
const emits = defineEmits(['toggle-menu'])
</script>

<template>
    <header class="w-full bg-primary-400 dark:bg-gray-800 border-b-2 border-transparent dark:border-primary  text-white">
        <div class="mx-auto px-4 py-6 flex items-center justify-between">
            <div class="flex flex-col gap-y-1">
                <h1 class="text-xl font-bold">
                    YOLO Travel Manager
                </h1>
                <BaseBreadcrumbs />
            </div>
            <div class="flex items-center space-x-4">
                <ColorScheme>
                    <USelect v-model="$colorMode.preference" :options="['system', 'light', 'dark']" />
                </ColorScheme>
                <!-- Hamburger Menu -->
                <button class="md:hidden focus:outline-none" @click="emits('toggle-menu')">
                    <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>
        </div>
    </header>
</template>

<style scoped lang="scss">

</style>
