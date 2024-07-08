<script setup lang="ts">
const colorMode = useColorMode();
const isDarkMode = ref(colorMode.preference === 'dark');
const isSystemMode = ref(colorMode.preference === 'system');

function toggleColorMode(value: boolean) {
    isDarkMode.value = value;
    colorMode.preference = value ? 'dark' : 'light';
}

watch(() => colorMode.preference, (newPreference) => {
    isDarkMode.value = newPreference === 'dark';
});

onBeforeMount(() => {
    if (isSystemMode.value) {
        toggleColorMode(false);
    }
    if (isDarkMode.value) {
        toggleColorMode(true);
    }
});
</script>

<template>
    <UToggle
        size="xl"
        off-icon="i-heroicons-sun"
        on-icon="i-heroicons-moon"
        :model-value="isDarkMode"
        @update:model-value="toggleColorMode"
    />
</template>
