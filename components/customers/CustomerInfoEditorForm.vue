<script setup lang="ts">
import type { FormError } from '#ui/types';
import { type ICustomerInfo, IGender } from '~/types/bookings/bookings.model';
import { utilsService } from '~/services/utils.service';
import { validatorsService } from '~/services/validators.service';

const props = defineProps<{ customer?: ICustomerInfo | null }>();

const emit = defineEmits<{
    (event: 'update:validation', data: { formData: ICustomerInfo | null; valid: boolean }): void;
}>();

const { t } = useI18n();

const customerInfoEditorFormRef = ref<HTMLFormElement>();
const customerFormModel = ref<ICustomerInfo>({
    firstName: '',
    lastName: '',
    age: null,
    gender: null,
    phone: null,
    email: '',
});

function populateForm(): void {
    if (props.customer) {
        customerFormModel.value = { ...props.customer };
    }
}

function submitForm(): void {
    customerInfoEditorFormRef.value?.submit();
}

function handleValidation(state: ICustomerInfo): FormError[] {
    const requiredFields: (keyof ICustomerInfo)[] = ['firstName', 'age', 'email', 'lastName', 'phone'];
    const errors: FormError[] = [];

    requiredFields.forEach((field) => {
        if (!state[field]) {
            errors.push({ path: field, message: t('COMMON.S04') });
        }
    });

    if (state.phone && validatorsService.phoneNumberValidator(state.phone)) {
        errors.push({ path: 'phone', message: t('COMMON.S21') });
    }

    if (state.email && validatorsService.emailValidator(state.email)) {
        errors.push({ path: 'email', message: t('COMMON.S15') });
    }

    if (state.age && validatorsService.ageValidator(state.age)) {
        errors.push({ path: 'age', message: t('COMMON.S23') });
    }

    return errors;
}

async function onSubmitSuccess() {
    emit('update:validation', { formData: customerFormModel.value, valid: true });
}
async function onSubmitError() {
    emit('update:validation', { formData: customerFormModel.value, valid: false });
}

onMounted(() => {
    if (props.customer) {
        populateForm();
    }
});

defineExpose({
    submitForm,
});
</script>

<template>
    <UForm ref="customerInfoEditorFormRef" :validate="handleValidation" :validate-on="['submit']" :state="customerFormModel" class="flex flex-col gap-y-3" @submit="onSubmitSuccess" @error="onSubmitError">
        <div class="flex gap-2 flex-wrap md:flex-nowrap">
            <UFormGroup :label="t('COMMON.S11')" name="firstName" required class="w-full md:w-1/2">
                <UInput v-model="customerFormModel.firstName" />
            </UFormGroup>

            <UFormGroup :label="t('COMMON.S10')" name="lastName" required class="w-full md:w-1/2">
                <UInput v-model="customerFormModel.lastName" />
            </UFormGroup>
        </div>

        <div class="flex gap-2 flex-wrap md:flex-nowrap">
            <UFormGroup :label="t('COMMON.S14')" name="email" required class="w-full md:w-1/2">
                <UInput v-model="customerFormModel.email" />
            </UFormGroup>
            <UFormGroup class="w-full md:w-1/2" :label="t('COMMON.S12')" name="age" required>
                <UInput v-model="customerFormModel.age" type="number" />
            </UFormGroup>
        </div>
        <div class="flex gap-2 flex-wrap md:flex-nowrap">
            <UFormGroup
                :label="t('COMMON.S20')" name="phone" class="w-full md:w-1/2" required
            >
                <UInput v-model="customerFormModel.phone" type="number" icon="i-heroicons-phone" />
            </UFormGroup>
            <UFormGroup class="w-full md:w-1/2" :label="t('COMMON.S13')" name="gender">
                <USelect
                    v-model="customerFormModel.gender"
                    :options="utilsService.getDropdownOptions(IGender, 'ENUMS.GENDER', t)" option-attribute="label"
                />
            </UFormGroup>
        </div>
    </UForm>
</template>
