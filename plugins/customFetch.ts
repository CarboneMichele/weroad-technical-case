import { type $Fetch, $fetch, type FetchResponse, type IFetchError } from 'ofetch';

export default defineNuxtPlugin(() => {
    const toast = useToast();

    const $customFetch: $Fetch = $fetch.create({
        baseURL: '/api',
        onResponse({ response }) {
            return response._data;
        },
        async onResponseError(context) {
            toast.add({ title: context.response._data.message, icon: 'i-heroicons-exclamation-circle', color: 'red' });
        },

    });

    useNuxtApp().provide('customFetch', $customFetch);
});
