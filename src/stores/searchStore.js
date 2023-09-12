import axios from "axios";
import { defineStore } from "pinia/dist/pinia";
import sresults from '../sresults.json'

export const useSearchStore = defineStore('search', {
    states: () => ({
        searchBox: '',
        searchResults: []
    }),
    actions: {
        triggerSearch() {
            this.searchResults = sresults;
        }
    }
});