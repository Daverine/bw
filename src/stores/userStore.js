import { defineStore } from "pinia/dist/pinia";
import saved from '../jsons/saved.json';
import followed from '../jsons/followed.json';
import reviews from '../jsons/reviews.json';

export const useUserStore = defineStore('user', {
    state: () => ({
        auth: false,
        userData: {
            firstName: 'Ayoola',
            lastName: 'Folorunso',
            email: 'folorunsodavid1@gmail.com',
            country: 'Nigeria',
            profileImg: '/images/profile.jpg',
            following: [],
            bookmarks: [],
            searchLocation: 'Itori, Ewekoro, Ogun state, Nigeria',

        },
        savedCards: [],
        followedCards: [],
        yourReviews: []
    }),
    actions: {
        login(email, password) {
            this.auth = true;
        },
        signup(firstname, lastname, email, password, country) {
            this.auth = true;
        },
        logout() {
            this.auth = false;
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