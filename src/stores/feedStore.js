import axios from "axios";
import { defineStore } from "pinia/dist/pinia";
import newFeeds from '../jsons/feeds.json'

export const useFeedStore = defineStore('feeds', {
    states: () => ({
        searchBox: '',
        feeds: []
    }),
    actions: {
        async getUpdate() {
            new Promise(() => {
                setTimeout(() => {
                    this.feeds = newFeeds;
                }, 200)
            });
        }
    }
});