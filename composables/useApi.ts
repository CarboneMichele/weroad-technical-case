import type { $Fetch } from 'ofetch';

export function useCustomFetch() {
    const nuxtApp = useNuxtApp();
    const customFetch = nuxtApp.$customFetch as $Fetch;

    async function get<T>(url: string, params?: Record<string, any>): Promise<T > {
        return await customFetch(url, {
            method: 'GET',
            ...params,
        });
    };

    async function post<T>(url: string, body: Record<string, any>): Promise<T> {
        return customFetch<T>(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body,
        });
    };

    async function put<T>(url: string, body: Record<string, any>): Promise<T> {
        return customFetch<T>(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body,
        });
    };

    async function del<T>(url: string): Promise<T> {
        return customFetch<T>(url, {
            method: 'DELETE',
        });
    };

    return {
        get,
        post,
        put,
        del,
    };
}
