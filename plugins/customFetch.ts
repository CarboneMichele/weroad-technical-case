import { type $Fetch, $fetch, type IFetchError } from 'ofetch';

export default defineNuxtPlugin(() => {
    const toast = useToast();

    const $customFetch: $Fetch = $fetch.create({
        baseURL: '/api',
        async onResponseError({ response }) {
            toast.add({ title: response._data.message });
        },
    });

    useNuxtApp().provide('customFetch', $customFetch);
});
