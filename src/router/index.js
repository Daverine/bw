import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SearchView from '../views/SearchView.vue';
import SavedView from '../views/SavedView.vue';
import FollowingView from '../views/FollowingView.vue';
import ProfileView from '../views/ProfileView.vue';

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
            path: '/profile',
            name: 'profile',
            component: ProfileView
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
