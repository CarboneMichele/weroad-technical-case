<script setup lang="ts">
const colorMode = useColorMode();
const isDarkMode = ref(colorMode.preference === 'dark');

function toggleColorMode(value: boolean) {
    isDarkMode.value = value;
    colorMode.preference = value ? 'dark' : 'light';
}

watch(() => colorMode.preference, (newPreference) => {
    isDarkMode.value = newPreference === 'dark';
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
