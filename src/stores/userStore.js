import { defineStore } from "pinia/dist/pinia";
import sresults from '../jsons/sresults.json';

export const useUserStore = defineStore('user', {
    state: () => ({
        auth: false,
        userData: {},
        savedCards: []
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
                    this.savedCards = sresults;
                }, 500);
            });
        }
    }
})