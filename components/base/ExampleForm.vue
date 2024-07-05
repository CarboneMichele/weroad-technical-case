<script setup lang="ts">
const emit = defineEmits(['validate']);

function validateForm() {
    // Logica di validazione
    const isValid = false; // Sostituisci con la tua logica
    emit('validate', isValid);
}

onMounted(() => {
    console.log('mounted e1');
});
onUnmounted(() => {
    console.log('un e1');
});
</script>

<template>
    <div>
        <form @submit.prevent="validateForm">
            <!-- Contenuto del form -->
            <button type="submit" class="btn btn-primary">
                Validate 1
            </button>
        </form>
    </div>
</template>
