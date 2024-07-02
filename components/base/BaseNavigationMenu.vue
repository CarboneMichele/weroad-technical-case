<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const topLevelRoutes = computed(() => {
    return router.getRoutes().filter(route => route.path.split('/').length === 2);
});
</script>

<template>
    <nav>
        <ul>
            <li v-for="route in topLevelRoutes" :key="route.path">
                <NuxtLink :to="route.path" class="flex items-center p-2 text-gray-700 dark:text-gray-300 hover:bg-primary-300 dark:hover:bg-primary-500 rounded-lg">
                    <span class="icon">{{ route.meta.icon }}</span>
                    <span class="ml-2 dark:hover:text-accent">{{ route.name }}</span>
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<style scoped lang="scss">

</style>
