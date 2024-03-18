import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SearchView from '../views/SearchView.vue';
import SavedView from '../views/SavedView.vue';
import FollowingView from '../views/FollowingView.vue';
import AccountView from '../views/AccountView.vue';
import Profile from '../components/Profile.vue';
import Reviews from '../components/Reviews.vue';
import Followed from '../components/Followed.vue';
import Saved from '../components/Saved.vue';
import Settings from '../components/Settings.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/search',
            name: 'search',
            component: SearchView 
        },
        {
            path: '/saved',
            name: 'saved',
            component: SavedView 
        },
        {
            path: '/following',
            name: 'following',
            component: FollowingView
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
