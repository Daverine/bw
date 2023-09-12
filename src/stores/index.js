import { defineStore } from "pinia/dist/pinia";

export const useMainStore = defineStore('main', {
    states: () => ({
        showFixedMenu: false
    }),
    actions: {
        mutateSFM(value) {
            if (typeof(value) !== 'boolean') return;
            this.showFixedMenu = value;
        }
    }
});