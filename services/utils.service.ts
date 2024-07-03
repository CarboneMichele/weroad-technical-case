class UtilsService {
    //* **FILES***
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
}

export const utilsService = new UtilsService();
