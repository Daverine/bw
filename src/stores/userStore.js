import saved from '@/jsons/saved.json';
import followed from '@/jsons/followed.json';
import reviews from '@/jsons/reviews.json';
import router from '@/router';
const getRoute = () => router.currentRoute.value;

export const useUserStore = defineStore('user', {
    state: () => ({
        auth: false,
        routeProceed: '',
        userData: {
            firstName: 'Ayoola',
            lastName: 'Folorunso',
            email: 'folorunsodavid1@gmail.com',
            country: 'Nigeria',
            profileImg: '/images/profile.jpg',
            following: [],
            bookmarks: [],
            searchLocation: 'Itori, Ewekoro, Ogun state, Nigeria',
            manageBisiness: true,
        },
        savedCards: [],
        followedCards: [],
        yourReviews: []
    }),
    actions: {
        login(email, password) {
            this.auth = true;
            
            if (getRoute().path === '/login' && this.routeProceed) router.push(this.routeProceed);
            else if (getRoute().path === '/login' || getRoute().path === '/') router.push('/home');
        },
        signup(firstname, lastname, email, password, country) {
            this.auth = true;
            if (getRoute().path === '/register' && this.routeProceed) router.push(this.routeProceed);
            else if (getRoute().path === '/register' || getRoute().path === '/') router.push('/home');
        },
        logout() {
            this.auth = false;
            if (getRoute().meta.auth) router.push('/');
        },
        async getSavedCards() {
            return new Promise(() => {
                setTimeout(() => {
                    this.savedCards = saved;
                }, 200);
            });
        },
        async getFollowedCards() {
            return new Promise(() => {
                setTimeout(() => {
                    this.followedCards = followed;
                }, 200);
            })
        },
        async getReviews() {
            return new Promise(() => {
                setTimeout(() => {
                    this.yourReviews = reviews;
                }, 200);
            })
        }
    }
})