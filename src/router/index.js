import { createRouter, createWebHistory } from 'vue-router';
import CommonView from '../components/CommonView.vue';
import StartView from '../views/StartView.vue';
import HomeView from '../views/HomeView.vue';
import SearchView from '../views/SearchView.vue';
import MessagingView from '../views/MessagingView.vue';

import AccountView from '../views/AccountView.vue';
import Profile from '../components/Profile.vue';
import Reviews from '../components/Reviews.vue';
import Followed from '../components/Followed.vue';
import Saved from '../components/Saved.vue';
import Settings from '../components/Settings.vue';

import BusinessView from '../views/BusinessView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'start',
            component: StartView,
            meta: {
                sideMenuToggle: true,
            }
        },
        {
            path: '/home',
            name: 'home',
            component: HomeView
        },
        {
            path: '/search',
            name: 'search',
            component: SearchView
        },
        {
            path: '/account',
            name: 'account',
            component: AccountView,
            children: [
                {
                    path: 'profile',
                    component: Profile
                },
                {
                    path: 'reviews',
                    component: Reviews
                },
                {
                    path: 'followed',
                    component: Followed
                },
                {
                    path: 'saved',
                    component: Saved
                },
                {
                    path: 'settings',
                    component: Settings
                }
            ]
        },
        {
            path: '/shop',
            name: 'shop',
            component: BusinessView
        },
        {
            path: '/messaging',
            name: 'messaging',
            component: MessagingView,
            meta: {
                sideMenuToggle: true,
            }
        },
        {
            path: '/manage'

        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

export default router
