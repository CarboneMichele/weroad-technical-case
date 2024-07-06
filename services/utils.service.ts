import { format, isValid } from 'date-fns';
import type { ComposerTranslation } from 'vue-i18n';
import type { ISelectOption } from '~/types/ui/selectOption.model';

class UtilsService {
    // DATES
    getFormattedDate(dateStr: string, stringFormat = 'dd/MM/yyyy'): string {
        return isValid(new Date(dateStr)) ? format(new Date(dateStr), stringFormat) : '-';
    }

    // FILES
    base64ToBlob(base64: string) {
        const contentType = 'application/octet-stream';

        const byteCharacters = atob(base64);
        const byteNumbers = new Uint8Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        return new Blob([byteNumbers], { type: contentType });
    }

    getBase64ImageMimeType(base64: string): string {
        const base64Header = base64.substring(0, 30);
        const mimeTypeMatch = base64Header.match(/^data:(image\/[a-zA-Z]*);base64,/);

        if (mimeTypeMatch && mimeTypeMatch.length > 1) {
            return mimeTypeMatch[1];
        }
        else {
            return 'image/png';
        }
    }

    getFilenameFromBase64(base64: string): string {
        const matches = base64.match(/^data:(image\/\w+);base64,/);
        if (matches && matches.length > 1) {
            const contentType = matches[1];
            return `file.${contentType.split('/')[1]}`;
        }
        else {
            return 'file.unknown';
        }
    }

    // ENUMS - SELECT
    getDropdownOptions(enumProp: any, i18nKey: string, translationInstance: ComposerTranslation): ISelectOption[] {
        const options: ISelectOption[] = [];
        for (const option in enumProp) {
            options.push({
                label: translationInstance(`${i18nKey}_${option}`),
                value: enumProp[option],
            });
        }
        return options;
    }

    // TIMEOUT
    async wait(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export const utilsService = new UtilsService();
