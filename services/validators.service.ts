class ValidatorsService {
    alphanumericValidator(text: string): boolean {
        const alphanumericRegex = /^[a-z0-9]+$/i;
        return !alphanumericRegex.test(text);
    }

    emailValidator(email: string): boolean {
        const emailRegex = /^\w+([+-.]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})$/;
        return !emailRegex.test(email);
    }

    exactLengthValidator(formValue: string, length: number): boolean {
        return formValue.length !== length;
    }

    maxLengthValidator(formValue: string, maxLength: number): boolean {
        return formValue.length > maxLength;
    }

    minLengthValidator(formValue: string, minLength: number): boolean {
        return formValue.length < minLength;
    }

    maxNumberValidator(formValue: number, maxValue: number): boolean {
        return formValue > maxValue;
    }

    minNumberValidator(formValue: number, minValue: number): boolean {
        return formValue < minValue;
    }

    onlyLettersValidator(text: string): boolean {
        const onlyLettersRegex = /^[a-z]+$/i;
        return !onlyLettersRegex.test(text);
    }
}

export const validatorsService = new ValidatorsService();
