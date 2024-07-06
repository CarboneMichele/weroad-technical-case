import type { RouterConfig } from '@nuxt/schema';

export default <RouterConfig> {
    // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
    routes: _routes => [
        {
            path: '/:catchAll(.*)*',
            redirect: { name: 'travels' },
            props: true,
        },
        {
            path: '/travels',
            name: 'travels',
            component: () => import('~/pages/travels/Travels.vue'),
            meta: { icon: 'rocket-launch' },
        },
        {
            path: '/travels/:id',
            name: 'travel',
            component: () => import('~/pages/travels/TravelDetail.vue'),
        },
        {
            path: '/bookings',
            name: 'bookings',
            component: () => import('~/pages/bookings/Bookings.vue'),
            meta: { icon: 'book-open' },
        },
    ],
};
