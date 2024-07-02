<script setup lang="ts">
import type { RouteLocationMatched, RouteRecordNameGeneric, RouteRecordNormalized } from 'vue-router'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

interface IBreadcrumb {
    name: RouteRecordNameGeneric
    path: string
}

const route = useRoute()

const crumbs = computed<IBreadcrumb[]>(() => {
    const matched: RouteLocationMatched[] = route.matched

    return matched.map((match: RouteRecordNormalized) => ({
        name: match.meta.breadcrumb as string || match.name,
        path: match.path,
    }))
})
</script>

<template>
    <nav aria-label="breadcrumb">
        <ol class="list-reset flex text-gray-600">
            <li v-for="(crumb, index) in crumbs" :key="index" class="flex items-center">
                <NuxtLink :to="crumb.path" class="text-accent-600 hover:underline">
                    {{ crumb.name }}
                </NuxtLink>
                <span v-if="index < crumbs.length - 1" class="mx-2 text-accent-600">/</span>
            </li>
        </ol>
    </nav>
</template>
