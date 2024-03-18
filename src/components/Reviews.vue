<script>
    import { useUserStore } from '../stores/userStore';
    import ReviewCard from './ReviewCard.vue';

    export default {
        setup() {
            const userStore = useUserStore();

            return { userStore }
        },
        components: { ReviewCard },
        mounted() {
            this.userStore.getReviews();
        }
    }
</script>
<template>
    <h6 class="centered">Your reviews</h6>
    <ReviewCard v-for="(result, i) in userStore.yourReviews" :key="i" :details="result" />
    
</template>