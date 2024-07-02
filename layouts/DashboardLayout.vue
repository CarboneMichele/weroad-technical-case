<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const topLevelRoutes = computed(() => {
    return router.getRoutes().filter(route => route.path.split('/').length === 2)
})

const menuOpen = ref(false)

function toggleMenu() {
    menuOpen.value = !menuOpen.value
}
</script>

<template>
    <div class="max-h-screen overflow-hidden flex flex-col min-h-screen transition-colors duration-300 bg-gray-100 dark:bg-gray-800">
        <!-- Header -->
        <header class="w-full bg-gray-800 text-white">
            <div class="mx-auto px-4 py-6 flex items-center justify-between">
                <div class="flex flex-col gap-y-1">
                    <h1 class="text-xl font-bold">
                        Titolo
                    </h1>
                    <BaseBreadcrumbs />
                </div>
                <div class="flex items-center space-x-4">
                    <ColorScheme>
                        <USelect v-model="$colorMode.preference" :options="['system', 'light', 'dark']" />
                    </ColorScheme>
                    <!-- Hamburger Menu -->
                    <button class="md:hidden focus:outline-none" @click="toggleMenu">
                        <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>

        <div class="flex flex-1 relative">
            <!-- Aside -->
            <aside class="absolute md:translate-x-0 md:static h-full duration-150 ease-out w-64 md:w-[400px] bg-gray-200 dark:bg-gray-900 p-4 shadow-lg md:block md:h-auto" :class="{ '-translate-x-full': !menuOpen, 'block top-0 translate-x-0': menuOpen }">
                <nav>
                    <ul>
                        <li v-for="route in topLevelRoutes" :key="route.path">
                            <NuxtLink :to="route.path" class="flex items-center p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg">
                                <span class="icon text-gray-600 dark:text-gray-400">{{ route.meta.icon }}</span>
                                <span class="ml-2">{{ route.name }}</span>
                            </NuxtLink>
                        </li>
                    </ul>
                </nav>
            </aside>

            <!-- Main Content -->
            <main class="dashboard-content flex-1 p-4">
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
