<script setup lang="ts">
import type { RouteLocationMatched, RouteRecordNameGeneric, RouteRecordNormalized } from 'vue-router';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

interface IBreadcrumb {
    name: RouteRecordNameGeneric;
    path: string;
}

const route = useRoute();

const breadcrumbs = computed<IBreadcrumb[]>(() => {
    const matched: RouteLocationMatched[] = route.matched;

    return matched.map((match: RouteRecordNormalized) => ({
        name: match.meta.breadcrumb as string || match.name,
        path: match.path,
    }));
});
</script>

<template>
    <nav aria-label="breadcrumb">
        <ol class="list-reset flex text-gray-600">
            <li v-for="(breadcrumb, index) in breadcrumbs" :key="index" class="flex items-center">
                <NuxtLink :to="breadcrumb.path" class="text-accent-600 hover:underline">
                    {{ breadcrumb.name }}
                </NuxtLink>
                <span v-if="index < breadcrumbs.length - 1" class="mx-2 text-accent-600">/</span>
            </li>
        </ol>
    </nav>
</template>
