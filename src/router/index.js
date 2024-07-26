import { createRouter, createWebHistory } from 'vue-router';
import { loadLayoutMiddleware } from '../middleware/loadLayoutMiddleware';
import { useUserStore } from '../stores/userStore';
import { useSearchStore } from '../stores/searchStore';

import index from '../pages/index.vue';
import search from '../pages/search.vue';
import auth from '../pages/auth.vue';
import home from '../pages/home.vue';
import messaging from '../pages/messaging.vue';
import myshops from '../pages/myshops.vue';
import account_index from '../pages/account/index.vue';
import account_profile from '../pages/account/profile.vue';
import account_reviews from '../pages/account/reviews.vue';
import account_saved from '../pages/account/saved.vue';
import account_followed from '../pages/account/followed.vue';
import manage_index from '../pages/manage/index.vue';
import manage_overview from '../pages/manage/overview.vue';
import manage_posts from '../pages/manage/posts.vue';
import manage_biz_info from '../pages/manage/biz_info.vue';
import manage_media from '../pages/manage/media.vue';
import manage_products from '../pages/manage/products.vue';
import manage_services from '../pages/manage/services.vue';
import manage_support from '../pages/manage/support.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'start',
            component: index
        },
        {
            path: '/search',
            name: 'search',
            component: search,
            meta: {
                layout: 'Common'
            }
        },
        {
            path: '/login',
            name: 'login',
            component: auth
        },
        {
            path: '/register',
            name: 'register',
            component: auth
        },
        {
            path: '/home',
            name: 'home',
            component: home,
            meta: {
                auth: true,
            }
        },
        {
            path: '/messaging',
            name: 'messaging',
            component: messaging,
            meta: {
                auth: true,
                noFab: true,
            }
        },
        {
            path: '/myshops',
            name: 'myshops',
            component: myshops,
            meta: {
                auth: true,
                layout: 'Common'
            }
        },
        {
            path: '/account',
            name: 'account',
            component: account_index,
            meta: {
                auth: true,
                layout: 'Common'
            },
            children: [
                {
                    path: 'profile',
                    name: 'account_profile',
                    component: account_profile
                },
                {
                    path: 'reviews',
                    name: 'account_reviews',
                    component: account_reviews
                },
                {
                    path: 'saved',
                    name: 'account_saved',
                    component: account_saved
                },
                {
                    path: 'followed',
                    name: 'account_followed',
                    component: account_followed
                },
            ]
        },
        {
            path: '/manage',
            name: 'managebiz',
            component: manage_index,
            meta: {
                auth: true,
                layout: 'Manage',
            },
            children: [
                {
                    path: 'overview',
                    name: 'biz_overview',
                    component: manage_overview
                },
                {
                    path: 'biz-info',
                    name: 'biz_info',
                    component: manage_biz_info
                },
                {
                    path: 'posts',
                    name: 'biz_posts',
                    component: manage_posts
                },
                {
                    path: 'media',
                    name: 'biz_media',
                    component: manage_media
                },
                {
                    path: 'products',
                    name: 'biz_products',
                    component: manage_products
                },
                {
                    path: 'services',
                    name: 'biz_services',
                    component: manage_services
                },
                {
                    path: 'support',
                    name: 'biz_support',
                    component: manage_support
                },
            ]
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
});

router.beforeEach((to, from) => {
    const
        userStore = useUserStore(),
        searchStore = useSearchStore()
    ;

    if (to.meta.auth && !userStore.auth) {
        userStore.routeProceed = to;
        return '/login';
    }

    if (from.path === '/search') {
        searchStore.searchBox = '';
    }
});

router.beforeEach(loadLayoutMiddleware);

export default router
