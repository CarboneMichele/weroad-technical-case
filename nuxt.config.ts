// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    devtools: { enabled: true },
    modules: [
        '@nuxt/ui',
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        '@vueuse/nuxt',
        '@nuxtjs/i18n',
    ],
    components: [
        {
            path: '~/components',
            pathPrefix: false,
        },
    ],
    hooks: {
        'prerender:routes': function ({ routes }) {
            routes.clear();
        },
    },
    i18n: {
        locales: [
            {
                code: 'en',
                file: 'en.json',
            },
        ],
        langDir: 'lang',
        defaultLocale: 'en',
    },
});
