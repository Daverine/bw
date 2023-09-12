import axios from "axios";
import { defineStore } from "pinia/dist/pinia";
import newFeeds from '../feeds.json'

export const useFeedStore = defineStore('feeds', {
    states: () => ({
        searchBox: '',
        feeds: newFeeds
    }),
    actions: {
        getUpdate() {
            this.feeds = newFeeds;
        }
    }
});