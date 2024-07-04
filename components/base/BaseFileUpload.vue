<script setup lang="ts">
import { utilsService } from '~/services/utils.service';

const props = defineProps<{ base64?: string }>();

const emit = defineEmits(['base64Change']);

const picture = ref<File | null>(null);
const previewURL = ref<string>('');
const fileInput = ref<HTMLInputElement | null>(null);

function handleFileChange(filesList: FileList): void {
    picture.value = filesList[0];
    previewURL.value = URL.createObjectURL(picture.value);

    // Read file as base64 and emit to parent
    const reader = new FileReader();
    reader.onload = () => {
        const base64Data: string = (reader.result as string)?.split(',')[1];
        emit('base64Change', base64Data);
    };

    reader.readAsDataURL(picture.value);
}

watch(() => props.base64, () => {

});

onBeforeUnmount(() => {
    if (previewURL.value) {
        URL.revokeObjectURL(previewURL.value);
    }
});
</script>

<template>
    <div class="flex flex-col gap-y-2">
        <UInput
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="handleFileChange"
        />

        <div v-if="props.base64" class="rounded self-center w-full h-[300px] flex object-contain">
            <img class="rounded-md shadow-md" :src="`data:${utilsService.getBase64ImageMimeType(props.base64)};base64,${props.base64}`" :alt="$t('COMMON.S10')">
        </div>
        <div v-else-if="previewURL" class="rounded self-center w-full h-[300px] flex object-contain">
            <img class="rounded-md shadow-md" :src="previewURL" :alt="$t('COMMON.S10')">
        </div>
    </div>
</template>
