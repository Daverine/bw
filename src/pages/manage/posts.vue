<script setup>
import { useRouter } from 'vue-router';

	const feedStore = useFeedStore();

	onMounted(() => feedStore.getUpdate());
</script>
<template>
    <header class="sp-wrapper fluid z-level-3 p-h" style="margin-bottom: 1rem;">
        <div v-scrollPin="{ topSpacing: 64, ancestorGuarded: true }" style="background-color: var(--surface);">
            <div class="fluid l-aligned">
                <div class="p-h3 h3">Posts</div>
                <hr class="0-b-margined" />
            </div>
        </div>
    </header>
    <section style="display: flex; flex-direction: column; align-items: center;">
        <FeedCard v-for="(feed, i) in feedStore.feeds" :key="i" :details="feed" />
    </section>


</template>