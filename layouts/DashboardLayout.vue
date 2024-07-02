<script setup>
import { ref } from 'vue'

const showAside = ref(false)
</script>

<template>
    <div class="max-h-screen overflow-hidden flex flex-col min-h-screen transition-colors duration-300 bg-gray-100 dark:bg-gray-800">
        <!-- Header -->
        <TheHeader :menu-open="showAside" @toggle-menu="showAside = !showAside" />

        <div class="flex flex-1 relative">
            <!-- Aside -->
            <aside class="absolute md:translate-x-0 md:static h-full duration-150 ease-out w-64 md:w-[400px] bg-gray-200 dark:bg-gray-900 p-4 shadow-lg md:block md:h-auto" :class="{ '-translate-x-full': !showAside, 'block top-0 translate-x-0': showAside }">
                <BaseNavigationMenu />
            </aside>

            <!-- Main Content -->
            <main class="dashboard-content flex-1 p-4 ">
                <NuxtPage />
            </main>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .dashboard-content {
        max-height: calc(100vh - 104px);
        overflow: auto;
    }
</style>
