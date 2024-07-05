<script setup lang="ts">
import type { FormError } from '#ui/types';
import { type ICustomerInfo, IGender } from '~/types/bookings/bookings.model';
import { utilsService } from '~/services/utils.service';

const props = defineProps<{ triggerValidation?: boolean; customer?: ICustomerInfo }>();

const emit = defineEmits(['validate']);

const { t } = useI18n();

const customerInfoEditorFormRef = ref<HTMLFormElement>();
const customerFormModel = ref<Partial<ICustomerInfo>>({
    firstName: '',
    lastName: '',
    age: null,
    gender: null,
    phone: null,
    email: '',
});
const isEdit = ref(props.customer);

function populateForm(): void {
    if (props.customer) {
        customerFormModel.value = { ...props.customer };
    }
}

function validate(state: Partial<ICustomerInfo>): FormError[] {
    const requiredFields: (keyof ICustomerInfo)[] = ['firstName', 'lastName', 'email', 'age', 'phone'];
    const errors: FormError[] = [];

    requiredFields.forEach((field) => {
        if (!state[field]) {
            errors.push({ path: field, message: t('COMMON.S04') });
        }
    });

    // Phone number validator

    // Email Validator

    return errors;
}

async function onSubmit() {
    emit('validate', true);
}
async function onError() {
    emit('validate', false);
}

onMounted(() => {
    if (isEdit.value) {
        populateForm();
    }
});

watch(() => props.triggerValidation, (newValue) => {
    if (newValue) {
        customerInfoEditorFormRef.value?.submit();
    }
});
</script>

<template>
    <UForm ref="customerInfoEditorFormRef" :validate="validate" :validate-on="['submit']" :state="customerFormModel" class="flex flex-col gap-y-3" @submit="onSubmit" @error="onError">
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
                <UInput type="number" />
            </UFormGroup>
        </div>
        <div class="flex gap-2 flex-wrap md:flex-nowrap">
            <UFormGroup
                :label="t('COMMON.S20')" name="phone" class="w-full md:w-1/2" required
            >
                <UInput type="number" icon="i-heroicons-phone" />
            </UFormGroup>
            <UFormGroup class="w-full md:w-1/2" :label="t('COMMON.S13')" name="gender">
                <USelect
                    :options="utilsService.getDropdownOptions(IGender, 'ENUMS.GENDER', t)" option-attribute="label"
                />
            </UFormGroup>
        </div>
    </UForm>
</template>
