<script setup lang="ts">
import type { IStep } from '~/types/ui/stepper.model';

const props = defineProps<{
    steps: IStep[];
    currentStep: number;
}>();

function isActiveStep(index: number): boolean {
    return props.currentStep >= index;
}
</script>

<template>
    <ol class="items-center md:justify-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
        <li v-for="(step, index) in props.steps" :key="index" class="flex items-start space-x-2.5 rtl:space-x-reverse" :class="[isActiveStep(index) ? 'text-primary-500 dark:text-primary-500' : 'text-gray-500 dark:text-gray-500']">
            <span class="flex items-center justify-center w-8 h-8 border border-gray-600 rounded-full shrink-0 dark:border-gray-500" :class="[isActiveStep(index) ? 'border-primary-600 dark:border-primary-500' : 'border-gray-600 dark:border-gray-500']">
                <template v-if="step.icon">
                    <UIcon :name="`i-heroicons-${step.icon}` " dynamic />
                </template>
                <template v-else>
                    {{ index + 1 }}
                </template>

            </span>
            <span>
                <h3 class="font-medium leading-tight">{{ step.title }}</h3>
                <p class="text-sm">{{ step.description }}</p>
            </span>
        </li>
    </ol>
</template>

<style lang="scss" scoped>

</style>
