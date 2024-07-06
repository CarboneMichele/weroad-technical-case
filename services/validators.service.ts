class ValidatorsService {
    phoneNumberValidator(phoneNumber: number): boolean {
        const phoneNumberString = phoneNumber.toString();
        // Italian phone number pattern: Starts with 3, followed by 9 digits
        const italianPhoneNumberRegex = /^3\d{9}$/;
        return !italianPhoneNumberRegex.test(phoneNumberString);
    }

    emailValidator(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/;
        return !emailRegex.test(email);
    }

    ageValidator(age: number): boolean {
        return age < 18;
    }
}

export const validatorsService = new ValidatorsService();
