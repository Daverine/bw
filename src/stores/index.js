import { defineStore } from "pinia/dist/pinia";

export const useMainStore = defineStore('main', {
    state: () => ({
        showFixedMenu: false,
        colorScheme: 'light-mode'
    }),
    actions: {
        mutateSFM(value) {
            if (typeof(value) !== 'boolean') return;
            this.showFixedMenu = value;
        }
    }
});