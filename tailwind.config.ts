import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
    theme: {
        extend: {
            colors: {
                accent: {
                    50: '#fff2fb',
                    100: '#ffe3f8',
                    200: '#ffc6f1',
                    300: '#ff99e1',
                    400: '#ff5ccd',
                    500: '#ff20c2',
                    600: '#fa00c6',
                    700: '#d000a1',
                    800: '#aa0081',
                    900: '#7f055f',
                    950: '#5f0047',
                },
            },
        },
    },
};
