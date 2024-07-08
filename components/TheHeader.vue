<script setup>
const emit = defineEmits(['toggle-menu']);
</script>

<template>
    <header class="w-full bg-primary-400 dark:bg-gray-800 border-b-2 border-transparent dark:border-primary  text-white">
        <div class="mx-auto px-4 py-6 flex items-center justify-between">
            <div class="flex flex-col gap-y-1">
                <h1 class="text-xl font-bold">
                    YOLO Travel Manager
                </h1>
            </div>
            <div class="flex items-center space-x-4">
                <BaseThemeToggle />
                <UButton
                    :ui="{
                        icon: {
                            base: 'text-white',
                        },
                        color: {
                            white: {
                                ghost: 'text-gray-900 dark:text-white hover:bg-primary dark:hover:bg-gray-900 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
                            },
                        },
                    }"
                    icon="i-heroicons-bars-3"
                    size="xl"
                    square
                    variant="ghost"
                    color="white"
                    @click="emit('toggle-menu')"
                />
            </div>
        </div>
    </header>
</template>

<style scoped lang="scss">

</style>
