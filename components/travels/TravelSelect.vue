<script setup lang="ts">
const props = defineProps<{ triggerValidation?: boolean }>();

const emit = defineEmits(['validate']);

function validateForm() {
    const isValid = true;
    emit('validate', isValid);
}

watch(() => props.triggerValidation, (newValue) => {
    if (newValue) {
        validateForm();
    }
});

onMounted(() => {

});
</script>

<template>
    <div>
        <form @submit.prevent="validateForm">
            <!-- Contenuto del form -->
            Travel select 1
        </form>
    </div>
</template>
