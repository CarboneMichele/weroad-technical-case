<script setup lang="ts">
import type { RouteLocationMatched } from 'vue-router'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const crumbs = computed(() => {
    const matched = route.matched
    return matched.map((match: RouteLocationMatched) => ({
        name: match.meta.breadcrumb || match.name,
        path: match.path,
    }))
})
</script>

<template>
    <nav aria-label="breadcrumb">
        <ol class="list-reset flex text-gray-600">
            <li v-for="(crumb, index) in crumbs" :key="index" class="flex items-center">
                <NuxtLink :to="crumb.path" class="text-blue-600 hover:underline">
                    {{ crumb.name }}
                </NuxtLink>
                <span v-if="index < crumbs.length - 1" class="mx-2">/</span>
            </li>
        </ol>
    </nav>
</template>
