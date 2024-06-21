import sresults from '../jsons/sresults.json';
import router from '@/router';
const getRoute = () => router.currentRoute.value;

export const useSearchStore = defineStore('search', {
    state: () => ({
        searchBox: '',
        searchResults: []
    }),
    actions: {
        triggerSearch() {
            if (!this.searchBox) return;
            router.push('/search?q='+this.searchBox);
            this.searchResults = sresults;
        }
    }
});