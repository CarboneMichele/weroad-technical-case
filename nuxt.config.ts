// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    devtools: { enabled: true },
    modules: ['@nuxt/ui', '@nuxtjs/tailwindcss'],
    components: [
        {
            path: '~/components',
            pathPrefix: false,
        },
    ],
    hooks: {
        'prerender:routes': function ({ routes }) {
            routes.clear()
        },
    },
})
