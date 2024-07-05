<!-- components/Wizard.vue -->
<script setup lang="ts">
import type { IStep } from '~/types/ui/stepper.model';

const props = defineProps<{
    steps: IStep[];
    currentStep: number;
}>();

const emit = defineEmits(['nextStep', 'prevStep']);

const { steps, currentStep } = toRefs(props);
</script>

<template>
    <div>
        <BaseStepper :steps="props.steps" :current-step="props.currentStep" class="mb-5" />

        <div class="justify-center flex">
            <slot :step="props.steps[currentStep]" />
        </div>

        <div class="flex gap-2 items-center w-full justify-center mt-4">
            <UButton :disabled="currentStep === 0" @click="emit('prevStep')">
                {{ $t('COMMON.S18') }}
            </UButton>
            <UButton :disabled="currentStep === steps.length - 1" @click="emit('nextStep')">
                {{ $t('COMMON.S17') }}
            </UButton>
        </div>
    </div>
</template>
