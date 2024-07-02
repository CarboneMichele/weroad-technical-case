<script setup lang="ts">
import type { RouteRecordNormalized } from 'vue-router'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const crumbs = computed(() => {
    const matched = route.matched

    return matched.map((match: RouteRecordNormalized) => ({
        name: match.meta.breadcrumb || match.name,
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
