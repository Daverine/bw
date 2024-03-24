import axios from "axios";
import { defineStore } from "pinia/dist/pinia";
import sresults from '../jsons/sresults.json';

export const useSearchStore = defineStore('search', {
    states: () => ({
        searchBox: '',
        searchResults: []
    }),
    actions: {
        triggerSearch() {
            if (!this.searchBox) return;
            this.$router.push('/search?q='+this.searchBox);
            this.searchResults = sresults;
        }
    }
});