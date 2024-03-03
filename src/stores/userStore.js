import { defineStore } from "pinia/dist/pinia";
import saved from '../jsons/saved.json';
import followed from '../jsons/followed.json';

export const useUserStore = defineStore('user', {
    state: () => ({
        auth: false,
        userData: {
            firstName: 'Ayoola',
            lastName: 'Folorunso',
            email: 'folorunsodavid1@gmail.com',
            country: 'Nigeria',
            profileImg: '/images/profile.jpg',

        },
        savedCards: [],
        followedCards: [],
    }),
    actions: {
        login(email, password) {
            this.userData = {
                firstname: "Ayoola",
                lastname: "Folorunso",
                country: "Nigeria",
                email: email
            };
            this.auth = true;
        },
        signup(firstname, lastname, email, password, country) {
            this.userData = {
                firstname: firstname,
                lastname: lastname,
                country: country,
                email: email
            }
            this.auth = true;
        },
        logout() {
            this.auth = false;
            this.userData = {};
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
                // setTimeout(() => {
                    this.followedCards = followed;
                // }, 200);
            })
        }
    }
})