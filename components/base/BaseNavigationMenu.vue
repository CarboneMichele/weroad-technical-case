<script setup lang="ts">
import type { RouteRecordNormalized } from 'vue-router';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentRoute = useRoute();

const topLevelRoutes = computed(() => {
    return router.getRoutes().filter(route => route.path.split('/').length === 2);
});

function isActiveRoute(route: RouteRecordNormalized): boolean {
    if (currentRoute.name === route.name) {
        return true;
    }
    else if (currentRoute.path.includes(route.name as string)) {
        return true;
    }
    else {
        return false;
    }
}
</script>

<template>
    <nav>
        <ul class="flex flex-col gap-y-1">
            <li v-for="route in topLevelRoutes" :key="route.path">
                <NuxtLink :to="route.path" class="flex items-center p-2 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-400 rounded-lg transition-colors" :class="{ 'bg-primary-300 dark:bg-primary-500 hover:bg-primary-300 dark:hover:bg-primary-500': isActiveRoute(route) }">
                    <span class="icon">{{ route.meta.icon }}</span>
                    <span class="ml-2 dark:hover:text-accent">{{ route.name }}</span>
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<style scoped lang="scss">

</style>
