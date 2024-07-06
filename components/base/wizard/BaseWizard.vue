<!-- components/Wizard.vue -->
<script setup lang="ts">
import type { IStep } from '~/types/ui/stepper.model';

const props = defineProps<{
    steps: IStep[];
    currentStep: number;
    loading?: boolean;
}>();

const emit = defineEmits(['nextStep', 'prevStep', 'finalize']);

const { steps, currentStep } = toRefs(props);

const showFinalizeConfirmation = ref(false);
</script>

<template>
    <div>
        <BaseStepper :steps="props.steps" :current-step="props.currentStep" class="mb-5" />

        <div class="justify-center flex">
            <slot :step="props.steps[currentStep]" />
        </div>

        <div class="flex gap-2 items-center w-full justify-center mt-4">
            <UButton :disabled="currentStep === 0" @click.stop="emit('prevStep')">
                {{ $t('COMMON.S18') }}
            </UButton>
            <UButton v-if="currentStep !== steps.length - 1" :disabled="currentStep === steps.length - 1" @click.stop="emit('nextStep')">
                {{ $t('COMMON.S17') }}
            </UButton>
            <BasePopConfirm v-if="currentStep === steps.length - 1" :show="showFinalizeConfirmation" @update:show="showFinalizeConfirmation = $event" @negative="showFinalizeConfirmation = false" @positive="emit('finalize')">
                <UButton :loading="props.loading">
                    {{ $t('COMMON.S24') }}
                </UButton>
            </BasePopConfirm>
        </div>
    </div>
</template>
