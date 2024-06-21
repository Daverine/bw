import { createRouter, createWebHistory } from 'vue-router';
import { loadLayoutMiddleware } from '../middleware/loadLayoutMiddleware';
import { useUserStore } from '../stores/userStore';

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

import SearchPage from '../views/SearchPage.vue';
import HomePage from '../views/HomePage.vue';

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
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
});

router.beforeEach((to) => {
    const userStore = useUserStore();

    if (to.meta.auth && !userStore.auth) {
        userStore.routeProceed = to;
        return '/login';
    }
});

router.beforeEach(loadLayoutMiddleware);

export default router
