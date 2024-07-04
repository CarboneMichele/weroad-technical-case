import type { RouterConfig } from '@nuxt/schema';

export default <RouterConfig> {
    // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
    routes: _routes => [
        {
            path: '/:catchAll(.*)*',
            redirect: { name: 'home' },
            props: true,
        },
        {
            path: '/',
            name: 'home',
            component: () => import('~/pages/index.vue'),
        },
        {
            path: '/travels',
            name: 'travels',
            component: () => import('~/pages/travels/Travels.vue'),
            meta: { icon: 'ℹ️', breadcrumb: 'Travels' },
        },
        {
            path: '/travels/:id',
            name: 'travel',
            component: () => import('~/pages/travels/TravelDetail.vue'),
            meta: { icon: 'ℹ️', breadcrumb: 'Travel' },
        },
        {
            path: '/bookings',
            name: 'bookings',
            component: () => import('~/pages/bookings/Bookings.vue'),
            meta: { icon: '📞', breadcrumb: 'Bookings' },
            children: [
                {
                    path: '/bookings/:id',
                    name: 'booking',
                    component: () => import('~/pages/bookings/BookingDetail.vue'),
                    meta: { icon: 'ℹ️', breadcrumb: 'Booking' },
                },
            ],
        },
    ],
};
